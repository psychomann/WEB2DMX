/* WiFi Manager */
#include <WiFiManager.h> // https://github.com/tzapu/WiFiManager
WiFiManager wm;

// Les paramètres Wifi locaux inscrit dans les .gitignore pour pas se retrouver en publique sur le net.

#include "wifi_access.env.sample.h" // à remplacer pour un truc maison, si absent utiliser :  "wifi_access.env.sample.h"

// Dans wifi_access*.h, il y a :
/*
#define WIFI_SSID_SOLO "ESP2DMX_SOLO"
#define WIFI_PWD_SOLO "dmx4show"
#define WIFI_SSID_HOME "Home_Wifi"
#define WIFI_PWD_HOME "G-+hubSEeMnic3IFy0uC4NuseIT,Ican'tMAKEitWorksS0rrybr0S"
*/

const char *ssid_solo = WIFI_SSID_SOLO;
const char *pwd_solo = WIFI_PWD_SOLO;

const char *ssid_home = WIFI_SSID_HOME;
const char *pwd_home = WIFI_PWD_HOME;

void wifi_setup(void)
{
    // Lancement de en mode l'access point
    WiFi.mode(WIFI_STA);
    Serial.printf("\nEn cas d'échec : \nSSID <<<%s\n>>> Mot de passe <<<%s>>>\n (Note : l'IP par défault est 192.168.4.1).\n", ssid_solo, pwd_solo);

    /* Lancement de WiFiManager */
    bool WNaCr; // WiFiManager autoConnect result
    WNaCr = wm.autoConnect(ssid_solo, pwd_solo);

    // Bilan de la connection
    if (!WNaCr)
        Serial.print("Erreur de connection.");
    else
        Serial.print("Connection établie.");
}