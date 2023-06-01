/**  Fonctions des paquets réseaux WebSocket **/

// Structure de démarrage vide
WSSS = ""; // {"IP":[]};
WSSS = new Object();
WSSS.IP = new Array();
WSSS.Socket = new Array();

// Génération de WSSS
function Lan_generate() {
  // console.log("Generation de WSSS");

  for (i = 0; i < UniDMX.Uni.length; i++) {
    // console.log("Univers : " + (i + 1) + ", adresse : " + UniDMX.Uni[i].IP);
    WSSS.IP[i] = UniDMX.Uni[i].IP;
    // console.log("Ajout dans WSSS.Socket de : " + WSSS.IP[i]);
    var ws_adress = "ws://" + WSSS.IP[i] + "/";
    WSSS.Socket[i] = new WebSocket(ws_adress);
    console.log("Connection WSSS.Socket[i] : ", WSSS.Socket[i]);
  }

  Load_WSSS = true;
}

// Purge de WSSS
function Lan_clean() {
  //  console.log("Lan en purge");

  for (i = 0; i < WSSS.Socket.length; i++) {
    /*
  console.log(
  " Suppression de l'Univers : " +
  (i + 1) +
  ", UniDMX.Uni[i].IP : " +
  UniDMX.Uni[i].IP +
  ", WSSS.IP[i] : " +
  WSSS.IP[i]
  );
*/
    WSSS.Socket[i].close();
    WSSS.Socket.pop();
    WSSS.IP.pop();
  }

  Load_WSSS = false;
}
