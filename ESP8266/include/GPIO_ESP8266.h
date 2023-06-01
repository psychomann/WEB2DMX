/*

[env:wemos_d1_mini32]
platform = espressif8266
board = d1_mini_pro
framework = arduino
monitor_speed = 115200

ESP8266A
PLATFORM: Espressif 8266 (3.2.0) > WeMos D1 mini Pro
HARDWARE: ESP8266 80MHz, 80KB RAM, 16MB Flash
Chip is ESP8266EX
Features: WiFi
Crystal is 26MHz

USB-SERIAL CH340 - USB VID:PID=1A86:7523 SER= LOCATION=1-1.3.2.3
PLATFORM: Espressif 8266 (3.2.0) > WeMos D1 mini Pro
HARDWARE: ESP8266 80MHz, 80KB RAM, 16MB Flash

5V   /   /   3V3
GND  /   15  D8
D4   2   13  D7
D3   0   12  D6
D2   4   14  D5
D1   5   16  D0
RX  (1)  (I) A0 (?)
TX  (3)  /   RST

*/

#define GPIO_TX 3  // TX, PWM
#define GPIO_RX 1  // RX, PWM
#define GPIO_D0 16  // 
#define GPIO_D1 5   // SCL (pour les écrans), PWM
#define GPIO_D2 4   // SDA (pour les écrans), PWM
#define GPIO_D3 0   // PWM
#define GPIO_D4 2   // PWM
#define GPIO_D5 14  // SCK, PWM
#define GPIO_D6 12  // MISO, PWM
#define GPIO_D7 13  // MOSI, PWM
#define GPIO_D8 15  // SS
// #define GPIO_A0 "?" //  Entrée Analogique Uniquement (Input)
