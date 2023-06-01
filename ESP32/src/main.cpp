#include <Arduino.h> // Base à ajouter car TGCM.

#include <ArduinoJson.h>
#include <LittleFS.h> // Systême de gestion de fichier

#include "Web2DMX.h"

#include <WiFiManager.h>
extern WiFiManager wm;             // lan_wifi.cpp
extern WebServer server;           // lan_httpd.cpp

extern const char *ssid_solo;
extern const char *pwd_solo;
extern const char *ssid_home;
extern const char *pwd_home;

#include "ESPDMX.h"
extern DMXESPSerial dmx_device;    // dmx_output.cpp

#include <WebSocketsServer.h>
extern WebSocketsServer webSocket; // lan_ws.cpp

void setup()
{
  // Fonction de configuration et d'initilisation

  // On démarre un terminal multifonction (débug, I/O ...)
  Serial.begin(115200);
  Serial.print("\nTerminal démarré avec un débit à 115200.");

  // Lancement de en mode l'access point

  WiFi.mode(WIFI_STA);
  // Serial.printf("\n\nSi WiFiManager ne se reconnecte pas automatiquement,\nCréation d'un point d'accès avec \n SSID : %s\n Mot de passe : %s\n (Note : l'IP par défault est 192.168.4.1)\n\n", ssid_solo, pwd_solo);

  bool WNaCr; // WiFiManager autoConnect result
  WNaCr = wm.autoConnect(ssid_solo, pwd_solo);
  // Bilan de la connection
  if (!WNaCr)
    Serial.print("Erreur de connection.");
  else
    Serial.print("Connection établie.");

  // Démarage du serveur WebSocket et assignation du gestionnaire d'évènement
  WebSocket_init();

  // Démarrage du système de fichier embarqué
  if (!LittleFS.begin())
  {
    Serial.println("Échec de l'initalisation de LittleFS.\n");
    return;
  }

  // Configuration des pages du site */
  HTTPD_init();
  Serial.println("Serveur HTTP Demarré.");

  // Configuration de l'univers DMX de l'ESP
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
  // dmx_device.update(); // Provoque un crash avec ESP32, provoque blackout sur la lampe test avec ESP8266
  delay(2); // allow the cpu to switch to other tasks
}
