#include <Arduino.h>  // Pour arduinoter (TGCM)
#include <FS.h>       // La version harcore qui sert à SPIF et Litte si j'ai bien suivi inclus dans SPIFFS.h
#include <SPIFFS.h>   // Pour utiliser des fichier dans le dossier DATA (SPIFFS semble être obsolète, pour ce que j'en ai lu)
#include "LittleFS.h" // Pour utiliser des fichier dans le dossier DATA (En remplacement de SPIFFS) // mais ne compile pas

// Pour pour les chipset ESP-8266
#ifdef ESP8266
#include <ESP8266WiFi.h> // Pour faire du wifi avec ESP-8266
#include <ESPAsyncTCP.h> // Pour des interuptions Asynchrone avec ESP-8266
#else
// Pour pour les chipset ESP-32
#include <WiFi.h>     // Pour faire du wifi avec ESP-32
#include <AsyncTCP.h> // Pour des interuptions Asynchrone avec ESP-32
#endif

#include <WiFiManager.h> // Include pour faire du creer une instance WiFiMamager, attention à la casse pour la bonne librairie
#include <WifiClient.h>
#include <ESPAsyncWebServer.h> // Include pour faire un Serveur Web Asynchrone ?
// #include <AsyncWebServer.h>

#include <WebServer.h>

#include <AsyncJson.h>   // Include pour faire du JSon
#include <ArduinoJson.h> // Include pour faire du JSon

void handle_introuvable();           // Fonction en cas de requette introuvable genre 404
void handle_racine();                // Fonction en cas de requette sur "/"
void handle_reset_wifi();            // Fonction de reinitialisation du WiFi
void status_serveur();               // Dump sur le terminal des informations du serveur, quand je sairait où les trouver
String processor(const String &var); // Processeur de remplacement pour les requettes %REMPLACE% par la chaine remplace

WebServer server(80); // Lancement d'un HTTPD
AsyncWebSocket ws("/ws");
WiFiManager wifimanager; // Création d'une instannce pour gerer le Wifi
boolean reset_wifi;      // Flag pour renouveller la connection wifi

String processor(const String &var)
{
  Serial.print("Le processor a été invoqué pour : ");
  Serial.println(var);

  String subtitution;

  if (var == "TEST")
  {
    Serial.print("Le processor a été invoqué pour TEST");
    subtitution = "Testé";
    return subtitution;
  }

  return String();
}

void setup()
{
  Serial.begin(115200);
  // Serial.println("Terminal Démarré");

  if (!SPIFFS.begin(true))
  {
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }

  File file = SPIFFS.open("/text.txt");
  if (!file)
  {
    Serial.println("Failed to open file for reading");
    return;
  }
  Serial.println("File Content:");
  while (file.available())
  {
    Serial.write(file.read());
  }
  file.close();

  /*
Prend en paramettre le nom du réseau par defaut : ESP<chipset>-<Numéro de Série>
Prend en paramettre le password vide par defaut
Possibilité de configurer le réseau par défaut IP = 192.168.4.1
*/
  wifimanager.autoConnect(); // Démmarage de l'instance wifimanager
                             // Serial.println("WiFi Manager Démmaré");

  /* Configuration des pages du site */
  server.on("/", handle_racine); // version appel à fonction

  server.on("/reset_wifi", handle_reset_wifi);

  server.begin();
  // Serial.println("Serveur opérationnel");

  // status_serveur();
}

// Handle root url (/)

/*// V1
void handle_racine() {
  server.send(200, "text/html", "<!DOCTYPE html><html lang=\"fr\"><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset =\"utf-8\"/><title>Page Racine</title></head><body>Test des accents telque	&lt; &gt; &agrave; &ccedil; &Ccedil; &egrave; &eacute; ... pour le charset</body></html>");
}
*/

const char racine_html[] PROGMEM = R"rawliteral(
  <!DOCTYPE html>
  <html lang="fr">
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Page Racine</title>
  </head>
  <body>
  Test des accents telque	&lt; &gt; &agrave; &ccedil; &Ccedil; &egrave; &eacute; ... pour le charset
  </body>
  </html>
  )rawliteral";

void handle_racine()
{
  server.send(200, "text/html", racine_html);
}

void loop()
{
  server.handleClient();
}

void handle_introuvable()
{
  String message = "Fichier introuvable\n\n";
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
}

const char reset_wifi_html[] PROGMEM = R"rawliteral(
  <!DOCTYPE html>
  <html lang="fr">
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Relance du WiFi</title>
  </head>
  <body>
  Le Wifi se relance, se reconnecter sur le réseau WiFi avec SSID "ESP_2_DMX" avec le mot de passe "dmx4show" sur l'IP sur 192.168.4.1.
  </body>
  </html>
  )rawliteral";

void wifi_reset()
{
  server.send(200, "text/html", reset_wifi_html);
  Serial.println("Effacement des paramètres WiFi et Redémarrage avec la configuration initiale ...");
  wifimanager.resetSettings();
  ESP.restart();
}

void esp_infos()
{
  /* Fichiers infos */
  Serial.println("Fichiers disponibles sur le module sont : \n");
  File root = LittleFS.open("/");
  File file = root.openNextFile();
  while (file)
  {
    Serial.println(file.name());
    file.close();
    file = root.openNextFile();
  }
  Serial.println("\n");
  /* Wifi IP infos */
  Serial.printf("Adresse IP : %s (avec la fonction : \"WiFi.localIP\")\n", WiFi.localIP());
}
