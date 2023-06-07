#ifdef ESP32
/*

> ws + DMX_Order x 10 || Get?c=x&v=y x2

Guru Meditation Error: Core  0 panic'ed (IllegalInstruction). Exception was unhandled.
Memory dump at 0x4013065c: c0126462 ffbf0200 ffffffff
Core  0 register dump:
PC      : 0x40130662  PS      : 0x00060030  A0      : 0x8013d170  A1      : 0x3ffcb040
A2      : 0x3ffcccdc  A3      : 0x3ffd0254  A4      : 0x3ffcb0a0  A5      : 0x0000002d
A6      : 0x3ffd035c  A7      : 0x3ffd02d6  A8      : 0x00000001  A9      : 0x0000003d
A10     : 0x0000003d  A11     : 0x00000017  A12     : 0x00000084  A13     : 0x3ffd03ca
A14     : 0x3ffd02e4  A15     : 0x00000008  SAR     : 0x00000010  EXCCAUSE: 0x00000000
EXCVADDR: 0x00000000  LBEG    : 0x400893bc  LEND    : 0x400893c7  LCOUNT  : 0x00000000
*/
#endif

#include <Arduino.h> // Base à ajouter car TGCM.

#include <ArduinoJson.h>
#include <LittleFS.h> // Systême de gestion de fichier

#include "Web2DMX.h"

#include <WiFiManager.h>
extern WiFiManager wm;   // lan_wifi.cpp
extern WebServer server; // lan_httpd.cpp

extern const char *ssid_solo;
extern const char *pwd_solo;
extern const char *ssid_home;
extern const char *pwd_home;

#include <ESPDMX.h>
// GPIO_D4 "D4" == 2
extern DMXESPSerial dmx_device; // dmx_output.cpp

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
  /*  // ESPDMX.cpp
  int sendPin = 2;		// default on ESP8266
  // sendPin à remplacer par 4 sur ESP32 sinon "Download Mode" failed !
  // => impossible de charger le programme

#ifdef ESP8266
  int sendPin = 2;		// default on ESP8266
#else
  int sendPin = 4;		// default on ESP32
#endif
  */
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
