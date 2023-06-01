/**  Fonctions pour charger un fichier contenant une structure JSon DMX **/

UniDMX_File = "";

// Charge un fichier qvecune structure JSonDMX dans UniDMX_File et demande un chargement dans UniDMX
function LoadFileDMXJSon() {
  let file = document.getElementById("LoadFile").files[0];
  let fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.onload = function () {
    UniDMX_File = fileReader.result;
    Load_UniDMX = true;

    DMXLoad();
  };

  fileReader.onerror = function () {
    console.log(fileReader.error);
  };
}

// Affiche la structure UniDMX dans la console
/* A modifier pour proposer de sauvegarder directement le fichier en web2dmx_backup_[aaaammjjhhmm].dmxjs */
function SaveFileDMXJSon() {
  console.log(JSON.stringify(UniDMX));
}
