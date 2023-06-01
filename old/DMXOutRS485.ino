// "Sketch" (source unique du programme) pour tester la librairie DmxSimple

// on intègre le header DmxSimple.h de https://github.com/PaulStoffregen/DmxSimple
#include <DmxSimple.h>


void setup() {
  // information d'initialisation, à faire une seule fois.

  // Le pin de sortie (à vraiment controler et ne pas utiliser n'importe lequel, il ne sont pas tous adapté à ça)
  DmxSimple.usePin(3);
  // Nombre de canneaux max pour ne pas surcharger le controleur inutilement si c'est pour utiliser uniquement un sport RGB
  // entre 1 et 512
  DmxSimple.maxChannel(32);
}

void loop() {

  // Le programme principal qui sera répété en boucle :
  int cannal_current = 0;
  int intensite = 0;

// Remise à zéro des canaux 1 à 4
cannal_current = 4;
while (cannal_current) {
  DmxSimple.write(cannal_current, 0);
  cannal_current --;
  }

// Pour les canaux 1 à 4 passage de 0 à 255 (puis retour à 0 de l'intensité pour refaire un crescendo
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
