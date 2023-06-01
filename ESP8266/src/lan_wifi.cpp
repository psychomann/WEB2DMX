/* Include Hardware*/
#include <Arduino.h>      // Base à jouter car TGCM.
#include "GPIO_ESP8266.h" // les vrai pins à utiliser pour un ESP8266 (wemos_d1_mini32)
#include <FS.h>           // Systême de gestion de fichier
#include "LittleFS.h"     // Systême de gestion de fichier

// ESP8266 Uniquement
#include <ESP8266WiFi.h> // https://github.com/esp8266/Arduino, https://github.com/tzapu/WiFiManager
#include <ESPAsyncTCP.h> // Pour des interuptions Asynchrone avec ESP-8266
// #include <AsyncTCP.h> // Pour des interuptions Asynchrone avec ESP-32

#include <DNSServer.h>        // https://github.com/tzapu/WiFiManager
#include <ESP8266WebServer.h> // https://github.com/tzapu/WiFiManager
// #include <ESPAsyncWebServer.h> // pour les ESP32


#include <WiFiManager.h> // https://github.com/tzapu/WiFiManager
WiFiManager wm;

// Les paramètres Wifi locaux inscrit dans les .gitignore pour pas se retrouver en publique sur le net.

#include "wifi_access.env.h" // si absent utiliser :  "wifi_access.env.sample.h"

// Dans wifi_access.env.h, il y a :
/*
#define WIFI_SSID_SOLO "ESP2DMX_SOLO"
#define WIFI_PWD_SOLO "dmx4show"
#define WIFI_SSID_HOME "Home_Wifi"
#define WIFI_PWD_HOME "G-+hubSEeMnic3IFy0uC4NuseIT,Ican'tMAKEitWorksS0rrybr0S"
*/

const char *ssid_home = WIFI_SSID_HOME;
const char *pwd_home = WIFI_PWD_HOME;

const char *ssid_solo = WIFI_SSID_SOLO;
const char *pwd_solo = WIFI_PWD_SOLO;
