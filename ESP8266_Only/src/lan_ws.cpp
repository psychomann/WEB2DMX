/* Include Hardware*/
#include <Arduino.h>      // Base à jouter car TGCM.
#include "GPIO_ESP8266.h" // les vrai pins à utiliser pour un ESP8266 (wemos_d1_mini32)
#include <FS.h>           // Systême de gestion de fichier
#include "LittleFS.h"     // Systême de gestion de fichier

/* pour le découpage du fichier main */
#include "Web2DMX.h"

/* Partie Serveur WebSocket */

// Constantes pour les ports
const int ws_port = 1337; // Valeur standard

#include <WebSocketsServer.h>

WebSocketsServer webSocket = WebSocketsServer(ws_port);

void onWebSocketEvent(uint8_t num, WStype_t type, uint8_t *payload, size_t length)
{
  // Détarmine le type d'évènement WebSocket
  switch (type)
  {
  // Un client se déconnecte
  case WStype_DISCONNECTED:
    Serial.printf("[%u], c'est disconnecté\n", num);
    break;
  // Un nouveau client c'est connecté
  case WStype_CONNECTED:
  {
    IPAddress ip = webSocket.remoteIP(num);
    Serial.printf("[%u] connecté depuis ", num);
    Serial.println(ip.toString());
  }
  break;
  // Affiche un message des textuel renvoyé au client
  case WStype_TEXT:
    // Serial.printf("[%u] a envoyé : %s\n", num, payload);
    webSocket.sendTXT(num, payload);
    DMX_parse_Order((char *) payload);
    break;
  // Pour le reste, on ne fait rien.
  case WStype_BIN:
  case WStype_ERROR:
  case WStype_FRAGMENT_TEXT_START:
  case WStype_FRAGMENT_BIN_START:
  case WStype_FRAGMENT:
  case WStype_FRAGMENT_FIN:
  default:
    Serial.printf("[%u] a envoyé un message non traité\n", num);
    break;
  }
}

void WebSocket_init(void)
{
  webSocket.begin();
  webSocket.onEvent(onWebSocketEvent);
} 
