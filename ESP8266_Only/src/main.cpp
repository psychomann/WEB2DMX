/* Include Hardware*/
#include <Arduino.h>  // Base à jouter car TGCM.
#include "LittleFS.h" // Systême de gestion de fichier
// JSon
#include <ArduinoJson.h> // Include pour faire du JSon

/* WiFi + WiFi Manager */
#include <WiFiManager.h>
extern WiFiManager wm;

#include "wifi_access.env.h"

extern const char *ssid_solo;
extern const char *pwd_solo;
extern const char *ssid_home;
extern const char *pwd_home;

/* Partie Serveur HTTPD */
#include <ESP8266WebServer.h> // https://github.com/tzapu/WiFiManager
// #include <ESPAsyncWebServer.h> // pour les ESP32

extern ESP8266WebServer server;

/* Web Sockets */
#include <WebSocketsServer.h>
extern WebSocketsServer webSocket;

/* Partie DMX */
#include "ESPDMX.h"
// GPIO_D4 "D4" == 2
extern DMXESPSerial dmx_device;

/* Pour le projet */
#include "Web2DMX.h"

/* Partie Fonction Setup */

void setup()
{
  // Fonction de configuration et d'initilisation

  // On démarre un terminal multifonction (débug, I/O ...)
  Serial.begin(115200);
  Serial.print("\nTerminal démarré avec un débit à 115200.");

  // Lancement de en mode l'access point

  WiFi.mode(WIFI_STA);
  Serial.printf("\nSi WiFiManager ne se reconnecte pas automatiquement,\nCréation d'un point d'accès avec \n SSID : %s\n Mot de passe : %s\n (Note : l'IP par défault est 192.168.4.1).\n", ssid_solo, pwd_solo);

  bool WNaCr; // WiFiManager autoConnect result
  WNaCr = wm.autoConnect(ssid_solo, pwd_solo);

  // Bilan de la connection
  if (!WNaCr)
    Serial.print("Erreur de connection.");
  else
    Serial.print("Connection établie.");

  // Démarage du serveur WebSocket et assignation du gestionnaire d'évènement
  WebSocket_init();

  // Test de lecture du fichier test.txt dans le dossier data embarqué
  if (!LittleFS.begin())
  {
    Serial.println("Une erreur est arrivé pendant l'initalisation de LittleFS.\n");
    return;
  }

  /*

    // test du fonctionnement de LittleFS
    File file = LittleFS.open("/checkfs.txt", "r");

    if (!file)
    {
      Serial.println("Le fichier n'a pas pu être ouvert.\n");
      return;
    }

    Serial.println("\nContenu du fichier >>> \n");
    while (file.available())
    {
      Serial.write(file.read());
    }
    file.close();
    Serial.println("\n<<< Fichier cloturé.\n");

  */

  /* Configuration des pages du site */

  HTTPD_init();
  Serial.println("\nServeur HTTP Demarré.");

  /* Setup Univers Solo DMX Embarqué */
  // Le pin de sortie (à vraiment controler et ne pas utiliser n'importe lequel, il ne sont pas tous adapté à ça)

  // Nombre de canneaux max pour ne pas surcharger le controleur inutilement si c'est pour utiliser uniquement un simple spot RGB
  // entre 1 et 512

  dmx_device.init(DMX_CAN_FOR_U);
}

void loop()
{
  // Boucle générale de l'application

  // interuption de type WebSocket
  webSocket.loop();

  static bool looping = 0;

  if (!looping)
  {
    Serial.println("La fontion Loop se lance.");
    looping = 1;
  }

  server.handleClient();
  dmx_device.update(); // <= Bug : blackout au bout de 1~2 secondes sans "update()"
  delay(2); // allow the cpu to switch to other tasks
}
