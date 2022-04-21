#include <Arduino.h>
#include <ESPmDNS.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>
#include <WebServer.h>

#include "GPIO_ESP32.h"

const int ledPin = LED_BUILTIN;

// Informations de connexion : cachées dans fichier wifi_local_login.h

#include "wifi_access.h"

const char *ssid_static = WIFI_SSID_HOME;
const char *pwd_static = WIFI_PWD_HOME;

WebServer server(80);

bool RebootFlag = false;

void handleRoot()
{
  digitalWrite(LED_BUILTIN, 1);
  server.send(200, "text/plain", "Inserer le contenu du fichier ESP_index.html avec text/html avoir du CSS en plus");
  digitalWrite(LED_BUILTIN, 0);
}

void handleNotFound()
{
  digitalWrite(LED_BUILTIN, HIGH);
  String message = "Fichier non trouvé\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++)
  {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
  digitalWrite(LED_BUILTIN, LOW);
}

void setup()
{
  pinMode(ledPin, OUTPUT); // initialize digital pin ledPin as an output.
  // Mise en place d'une connexion série pour controle
  Serial.begin(115200);
  Serial.println("");

  pinMode(LED_BUILTIN, OUTPUT); // Retour visuel
  digitalWrite(LED_BUILTIN, LOW);

  // Intention de connection wifi
  Serial.println("Connection avec :");
  Serial.println(ssid_static);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid_static, pwd_static);

  Serial.println("Connection wifi demarré");

  // Réseau disponible ?
  int wifi_init = 30; // Tentative de connection pendant 30 cycles de 250ms (tempo_connextion) = 15 secondes
  bool wifi_connection = 0;
  int tempo_connextion = 250; // controle de lóuverture de session

  while (wifi_init && !wifi_connection)
  {
    if (!wifi_connection)
    {
      if (WiFi.status() == WL_CONNECTED)
        {
          wifi_connection = 1;
        }
    }
    digitalWrite(LED_BUILTIN, HIGH);
    delay(tempo_connextion/2);
    digitalWrite(LED_BUILTIN, LOW);
    delay(tempo_connextion/2);
    Serial.print(".");
    wifi_init--;
  }

  if (wifi_connection)
  {
    Serial.print("Connexion établie avec : ");
    Serial.println(ssid_static);
    Serial.print("IP address : ");
    Serial.println(WiFi.localIP());
  }
  else
  {
    Serial.println("");
    Serial.print("Pas de connection\n");
    Serial.print("Création d'un acces point : \n");
    // Mode point d'accès -- !!! Ne marche pas encore !!!
    WiFi.softAP(WIFI_SSID_SOLO, WIFI_PWD_SOLO);
    Serial.print(WIFI_SSID_SOLO);
    WiFi.begin();
    Serial.print("\nRéseau individuel activé");
    Serial.print("\nIP address : ");
    Serial.println(WiFi.localIP());
  }

/*
  if (MDNS.begin("ESP32-DMX"))
  {
    Serial.println("Réponse MDNS démmaré");
  }
*/

  server.on("/", handleRoot);
  server.on("/inline", []() {server.send(200, "text/plain", "Du texte brut sur une ligne");} );
  server.onNotFound(handleNotFound);
  server.begin();
  Serial.println("Serveur HTTP Demarré");
}

// the loop function runs over and over again forever
void loop()
{
  static bool looping = 0;
  
  if (!looping)
  {
    Serial.println("La fontion Loop se lance");
    looping = 1;
  }

  server.handleClient();
  delay(2); //allow the cpu to switch to other tasks
}
