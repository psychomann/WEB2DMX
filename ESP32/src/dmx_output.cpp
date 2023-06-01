/* Include Hardware*/
#include <Arduino.h> // Base à jouter car TGCM.

/* Partie DMX */

#include "ESPDMX.h"

// GPIO_D4 "D4" == 2
DMXESPSerial dmx_device;

void DMX_Order(int channel, int value)
{
  Serial.printf("DMX_Order : Can <<%i>>, Val <<%i>>\n", channel, value);
  dmx_device.write(channel, value);
  dmx_device.update();
}

void DMX_parse_Order(char *payload)
{
  char *channel;
  char *value;
  static int cannal = 0;
  int valeur;

  // Serial.printf("DMX_parse_Order - payload : <<%s>>", payload);

  channel = strtok(payload, ":");
  value = strtok(NULL, ":");

  cannal = atoi(channel);
  valeur = atoi(value);

  // Controles des erreurs
  if ((cannal < 1) || (512 < cannal))
  {
    Serial.printf("DMX_parse_Order : La valeur du cannal est érronée (%i) sur [0-512]\nMise à 0 de la valeur du cannal.\nInterruption de la fonction\n", valeur);
    cannal = 0;
    return;
  }
  if (valeur < 0)
  {
    Serial.printf("DMX_parse_Order : La valeur pour le canal est éronnée (%i) sur [0-255], elle est mise à 0\n", valeur);
    valeur = 0;
  }
  if (valeur > 255)
  {
    Serial.printf("DMX_parse_Order : La valeur pour le canal est éronnée (%i) sur [0-255], elle est mise à 255\n", valeur);
    valeur = 255;
  }
  
  // Serial.printf("%s / %i pour can, %s / %i pour val \n", channel, cannal, value, valeur);

  DMX_Order(cannal, valeur);
}