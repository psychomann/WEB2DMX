#include "Web2DMX.h"

#include <LITTLEFS.h>
#include <WiFiManager.h>

extern WiFiManager wm;

// Server server(http_port);
const int http_port = 80; // Valeur standard
WebServer server(http_port);

/* Chargement de fichier */

String ReadFileToString(const char *filename)
{
  // Serial.printf("\nouverture de : %s.", filename);
  auto file = LittleFS.open(filename, "r");
  // Read into temporary Arduino String
  String data = file.readString();
  // Don't forget to clean up!
  // Serial.printf("\nDonnés <<%s>>", filename);
  file.close();
  return data;
}

/* les pages du serveur HTTPD */

void load_404()
{
  const char *filename = "/404.html";
  Serial.printf("\nRequête pour une page introuvable (404)");
  server.send(200, "text/html", ReadFileToString(filename));
}

void load_checkfs()
{
  const char *filename = "/checkfs.txt";
  Serial.printf("\nRequête pour la page : %s.", filename);
  server.send(200, "text/plain", ReadFileToString(filename));
}

void load_get()
{
  String tampon_c;
  String tampon_v;
  const char *resultat;
  static int cannal = 0;
  static int valeur = 0;

  /* Récupération du cannal */
  if (server.arg("c") != "")
  {
    tampon_c = server.arg("c");
  }
  else if (server.arg("cannal") != "")
  {
    tampon_c = server.arg("cannal");
  }
  else if (server.arg("canal") != "")
  {
    tampon_c = server.arg("canal");
  }
  else if (server.arg("can") != "")
  {
    tampon_c = server.arg("can");
  }
  else if (server.arg("channel") != "")
  {
    tampon_c = server.arg("channel");
  }
  else if (server.arg("chan") != "")
  {
    tampon_c = server.arg("chan");
  }
  else if (cannal == 0)
  {
    Serial.printf("\nPas de valeur cannal initialisé.");
    server.send(200, "text/plain", "Fail cannal setup");
    return;
  }

  resultat = tampon_c.c_str();
  cannal = atoi(resultat);

  // Controles des erreurs
  if (cannal == 0)
  {
    Serial.printf("\nDéfinir une valeur initiale pour le cannal avec c, can, canal, cannal, chan ou channel. \nAvec par exemple la syntaxe /get?c=1&v=255");
    return;
  }
  if ((cannal <= 0) || (cannal > 512))
  {
    Serial.printf("\nLe cannal est de %i sur [0-512], cannal remis à 0\n", valeur);
    cannal = 0;
  }
  if (cannal == 0)
  {
    Serial.printf("\nValeur du canal erronné.");
    server.send(200, "text/plain", "Fail");
    return;
  }

  /* Récupération de la valeur */
  if (server.arg("v") != "")
  {
    tampon_v = server.arg("v");
  }
  if (server.arg("val") != "")
  {
    tampon_v = server.arg("val");
  }
  if (server.arg("value") != "")
  {
    tampon_v = server.arg("value");
  }
  if (server.arg("valeur") != "")
  {
    tampon_v = server.arg("valeur");
  }

  resultat = tampon_v.c_str();

  // en cas d'absence de la valeur réutilisation de la valeur précédante
  if (strcmp(resultat, ""))
  {
    valeur = atoi(resultat);
  }
  else
  {
    Serial.printf("\nRéutilisation de la valeur précédante : %i\n", valeur);
  }

  // Controles des erreurs
  if (valeur > 255)
  {
    Serial.printf("\nLa valeur est de %i sur [0-255], elle est remise à 255\n", valeur);
    valeur = 255;
  }
  if (valeur < 0)
  {
    Serial.printf("\nLa valeur est de %i sur [0-255], elle est remise à 0\n", valeur);
    valeur = 0;
  }

  // Changement validé
  Serial.printf("\nMéthode Get : Changement du cannal %i à la valeur %i\n", cannal, valeur);
  server.send(200, "text/plain", "Ok");
  DMX_Order(cannal, valeur);
}

void load_dmx_configs()
{
  const char *filename = "/dmx_configs.js";
  // Serial.printf("\nRequête pour les scripts dans le fichier %s.", filename);
  server.send(200, "application/javascript", ReadFileToString(filename));
}

void load_dmx_console()
{
  const char *filename = "/dmx_console.html";
  // Serial.printf("\nRequête pour la page : %s.", filename);
  server.send(200, "text/html", ReadFileToString(filename));
}

void load_index()
{
  const char *filename = "/dmx_console.html";
  // Serial.printf("\nRequête pour la page : %s.", filename);
  server.send(200, "text/html", ReadFileToString(filename));
}

void load_dmx_page_render()
{
  const char *filename = "/dmx_page_render.js";
  // Serial.printf("\nRequête pour la page : %s.", filename);
  server.send(200, "application/javascript", ReadFileToString(filename));
}

void load_dmx_setup()
{
  const char *filename = "/dmx_setup.js";
  // Serial.printf("\nRequête pour les scripts dans le fichier %s.", filename);
  server.send(200, "application/javascript", ReadFileToString(filename));
}

void load_dmx_setup_app()
{
  const char *filename = "/dmx_setup_app.js";
  // Serial.printf("\nRequête pour les scripts dans le fichier %s.", filename);
  server.send(200, "application/javascript", ReadFileToString(filename));
}

void load_dmx_setup_can()
{
  const char *filename = "/dmx_setup_can.js";
  // Serial.printf("\nRequête pour les scripts dans le fichier %s.", filename);
  server.send(200, "application/javascript", ReadFileToString(filename));
}

void load_dmx_setup_files()
{
  const char *filename = "/dmx_setup_files.js";
  // Serial.printf("\nRequête pour les scripts dans le fichier %s.", filename);
  server.send(200, "application/javascript", ReadFileToString(filename));
}

void load_dmx_setup_io()
{
  const char *filename = "/dmx_setup_io.js";
  // Serial.printf("\nRequête pour les scripts dans le fichier %s.", filename);
  server.send(200, "application/javascript", ReadFileToString(filename));
}

void load_dmx_setup_lan()
{
  const char *filename = "/dmx_setup_lan.js";
  // Serial.printf("\nRequête pour les scripts dans le fichier %s.", filename);
  server.send(200, "application/javascript", ReadFileToString(filename));
}

void load_dmx_setup_uni()
{
  const char *filename = "/dmx_setup_uni.js";
  // Serial.printf("\nRequête pour les scripts dans le fichier %s.", filename);
  server.send(200, "application/javascript", ReadFileToString(filename));
}

void load_dmx_setup_val()
{
  const char *filename = "/dmx_setup_val.js";
  // Serial.printf("\nRequête pour les scripts dans le fichier %s.", filename);
  server.send(200, "application/javascript", ReadFileToString(filename));
}

void load_siomin()
{
  const char *filename = "/socket.io.min.js";
  // Serial.printf("\nRequête pour la feuille de style : %s.", filename);
  server.send(200, "application/javascript", ReadFileToString(filename));
}

void load_css()
{
  const char *filename = "/style.css";
  // Serial.printf("\nRequête pour la feuille de style : %s.", filename);
  server.send(200, "text/css", ReadFileToString(filename));
}

void load_test()
{
  Serial.printf("\nRequête pour un test.");
  server.send(200, "text/css", "Test : ok");
}

void load_wifi_reset()
{
  const char *filename = "/wifi_reset.html";
  Serial.printf("\nRequête pour reinitialisé le WiFi.");
  server.send(200, "text/html", ReadFileToString(filename));
  wm.resetSettings();
  ESP.restart();
}

/* Setup du service HTTPD */

void HTTPD_init(void)
{
  // Serial.printf("requette HTML\n");
  server.onNotFound(load_404); // Page 404

  server.on("/check.txt", load_checkfs); // Appel sur fonction load_txt()
  server.on("/", load_dmx_console);                 // Appel sur fonction load_html()
  server.on("/index.html", load_index);             // Appel sur fonction load_html()
  server.on("/dmx_console.html", load_dmx_console); // Appel sur fonction load_html()

  server.on("/get", load_get);

  server.on("/dmx_configs.js", load_dmx_configs);         // Appel sur fonction load_js()
  server.on("/dmx_page_render.js", load_dmx_page_render); // Appel sur fonction load_js()
  server.on("/dmx_setup_app.js", load_dmx_setup_app);     // Appel sur fonction load_js()
  server.on("/dmx_setup_can.js", load_dmx_setup_can);     // Appel sur fonction load_js()
  server.on("/dmx_setup_files.js", load_dmx_setup_files); // Appel sur fonction load_js()
  server.on("/dmx_setup_io.js", load_dmx_setup_io);       // Appel sur fonction load_js()
  server.on("/dmx_setup_lan.js", load_dmx_setup_lan);     // Appel sur fonction load_js()
  server.on("/dmx_setup_uni.js", load_dmx_setup_uni);     // Appel sur fonction load_js()
  server.on("/dmx_setup_val.js", load_dmx_setup_val);     // Appel sur fonction load_js()
  server.on("/dmx_setup.js", load_dmx_setup);             // Appel sur fonction load_js()

  server.on("/socket.io.min.js", load_siomin); // Appel sur fonction load_js()
  
  server.on("/style.css", load_css);         // Appel sur fonction load_css()
  server.on("/test", load_test);             // Appel sur fonction load_css()
  server.on("/wifi_reset", load_wifi_reset); // Appel sur fonction pour relancer WiFiManager par le Web

  server.begin();
}
