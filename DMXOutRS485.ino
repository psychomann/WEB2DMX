#include <DmxSimple.h>

void setup() {
  // put your setup code here, to run once:
  DmxSimple.usePin(3);
  DmxSimple.maxChannel(32);
}

void loop() {
  // put your main code here, to run repeatedly:
  int cannal_current = 0;
  int intensite = 0;

// Remise à zéro des canaux 1 à 4
cannal_current = 4;
while (cannal_current) {
  DmxSimple.write(cannal_current, 0);
  cannal_current --;
  }

// Pour les canaux 1 à 4 passage de 0 à 255 puis retour à 0
cannal_current = 1;
while (cannal_current < 4) {
  while (intensite < 255) {
    DmxSimple.write(cannal_current, intensite);
    intensite ++;
    delay(10);
    }
   while (intensite) {
    DmxSimple.write(cannal_current, intensite);
    intensite --;
    delay(10);
    }
    cannal_current ++;
    intensite = 0;
  }
}
