/* à ajouter de base car TGCM. */
#include <Arduino.h>

/* Fichiers embarqués */
#include <FS.h>
#include <LittleFS.h> // Systême de gestion de fichier

/* JSon */
#include <ArduinoJson.h> // Include pour faire du JSon

/* Pour le projet */
#include "Web2DMX.h"

/* Lan */

/* WiFi Manager */
#include <WiFiManager.h>
// extern WiFiManager wm;

/* Partie Serveur HTTPD */
#ifdef ESP8266

#include <ESP8266WebServer.h>
extern ESP8266WebServer server;

#else

extern WebServer server; // lan_httpd.cpp

#endif

/* Web Sockets */
#include <WebSocketsServer.h>
extern WebSocketsServer webSocket;

/* Partie DMX */
#include <ESPDMX.h>
// ESP8266 : GPIO_D4 "D4" == 2
// ESP8266 : GPIO_D2 "D2" == 2
extern DMXESPSerial dmx_device;


/* Partie Fonction Setup */

void setup()
{
  // Fonctions de configuration et d'initilisation

  // On démarre un terminal multifonction avec monitor_speed = 115200 (débug, I/O ...)
  Serial.begin(115200);
  Serial.println(" Terminal : On (à 115200).");

  /* Wifi setup ~ démmarage de Wifi Manager*/
  wifi_setup();
 
  // Démarage du serveur WebSocket et assignation du gestionnaire d'évènement
  WebSocket_init();

  /* LittleFS setup ~ Démarrage du Système de fichiers */
  // Test de lecture du fichier test.txt dans le dossier data embarqué

  if (!LittleFS.begin())
  {
    Serial.println(" LittleFS : Fail.");
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
    Serial.println("\nContenu du fichier >>>");
    while (file.available())
    {
      Serial.write(file.read());
    }
    file.close();
    Serial.println("<<< Fichier cloturé.\n");
  */

  /* HTTPD setup ~ Configuration des pages du site */
  HTTPD_init();
  Serial.println(" Serveur HTTP : Ok.");

  /* Setup Univers Solo DMX Embarqué */
  // Le pin de sortie (à vraiment controler et ne pas utiliser n'importe lequel, il ne sont pas tous adapté à ça)

  // Nombre de canneaux max pour ne pas surcharger le controleur inutilement si c'est pour utiliser uniquement un simple spot RGB
  // entre 1 et 512

  dmx_device.init(DMX_CAN_FOR_U); // #define "Web2DMX.h"
  Serial.println(" DMX output : Ok.");

}

void loop()
{
  /* Démmarrage de la Boucle */
  static bool looping = 0;
  if (!looping)
  {
    Serial.println("Loop() : Ok.");
    looping = 1;
  }

  /* Interuption WebSocket */
  webSocket.loop(); // interuption de type WebSocket
  /* Interuption HTTPD */
  server.handleClient();
  /* DMX  live ! */

#ifdef ESP8266
  dmx_device.update(); // <= Bug : blackout au bout de 1~2 secondes sans "update()"
#else
#endif

  delay(2); // allow the cpu to switch to other tasks
}
