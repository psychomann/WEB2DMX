
// #include "wifi_access.env.h"
#include "wifi_access.env.sample.h"
/* // ou bien :
#define WIFI_SSID_SOLO "ESP_2_DMX"
#define WIFI_PWD_SOLO "dmx4show"

#define WIFI_SSID_HOME "Home_Wifi"
#define WIFI_PWD_HOME "G-+hubSEeMnic3IFy0uC4NuseIT,Ican'tMAKEitWorksS0rrybr0S"
*/

const char *ssid_home = WIFI_SSID_HOME;
const char *pwd_home = WIFI_PWD_HOME;
const char *ssid_solo = WIFI_SSID_SOLO;
const char *pwd_solo = WIFI_PWD_SOLO;

#include <WiFiManager.h>
WiFiManager wm;
