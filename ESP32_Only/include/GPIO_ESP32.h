// ledPin refers to ESP32 GPIO 23
#define LED_BUILTIN 2

/*

PLATFORM: Espressif 32 (3.3.2) > Espressif ESP32 Dev Module
HARDWARE: ESP32 240MHz, 320KB RAM, 4MB Flash
Crystal is 40MHz
Changing baud rate to 460800
Builtin Pin = D2 (2)
Chip is ESP32-D0WDQ6 (revision 1)
Features: WiFi, BT, Dual Core, 240MHz, VRef calibration in efuse, Coding Scheme None

Pin DEF DEF Pin
3V3 Ø   Ø   VIN
GND Ø   Ø   GND
D15 15  13  D13
D2  2   12  D12
D4  4   14  D14
RX2 ?   27  D27
TX2 ?   26  D26
D5  5   25  D25
D18 18  33  D33
D19 19  32  D32
D21 21  ?   D35
RX0 ?   ?   D34
TX0 ?   Ø   UN
D22 22  Ø   UP
D23 23  Ø   EN

*/

#define GPIO_TX0    1
#define GPIO_D2     2 // #define LED_BUILTIN
#define GPIO_RX0    3
#define GPIO_D4     4
#define GPIO_D5     5
#define GPIO_D13    13
#define GPIO_D14    14
#define GPIO_D15    15
#define GPIO_RX2    16
#define GPIO_TX2    17
#define GPIO_D18    18
#define GPIO_D19    19
#define GPIO_D21    21
#define GPIO_D22    22
#define GPIO_D23    23
#define GPIO_D25    25
#define GPIO_D27    27
#define GPIO_D26    26
#define GPIO_D32    32
#define GPIO_D33    33
// #define GPIO_34  34 //  Entrée Uniquement (Input)
// #define GPIO_35  35 //  Entrée Uniquement (Input)
// #define GPIO_UP  36 //  Entrée Uniquement (Input)
// #define GPIO_UN  39 //  Entrée Uniquement (Input)
