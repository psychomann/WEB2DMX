/**  Ajout, suppression, renomage d'un canal d'un appareil **/

function AddCan(element) {
  // Ajoute un paramètre à la fin du tableau
  // Exemple : element.id = SendNewCan_U1_App1
  var CanAddID = element.id;
  var CanAddIDsplit = CanAddID.split("_");
  var IDUniver = CanAddIDsplit[1];
  var IDApp = CanAddIDsplit[2];
  var ValUniver = IDUniver.slice(1); // On vire "U" de l'ID
  var ValApp = IDApp.slice(3); // On vire "App" de l'ID
  var Nbr_app = UniDMX.Uni[ValUniver - 1].App[ValApp - 1].Can.length;
  var NameForNewCan = "NameForNewCan_U" + ValUniver + "_App" + ValApp;
  var InputRegVal = "ValForNewCan_U" + ValUniver + "_App" + ValApp;
  var NewName = document.getElementById(NameForNewCan).value;
  var NewVal = document.getElementById(InputRegVal).value;
  if (-1 < NewVal && NewVal < 128) {
    UniDMX.Uni[ValUniver - 1].App[ValApp - 1].CanName.push(NewName);
    UniDMX.Uni[ValUniver - 1].App[ValApp - 1].Can.push(NewVal);
  }

  DMXLoad();
}

function DelCan(element) {
  // Supprime le dernier paramètre à la fin du tableau
  // Exemple : element.id = "DelLastCan_U1_App1"
  var DelID = element.id;
  var DelIDsplit = DelID.split("_");
  var IDUniver = DelIDsplit[1];
  var IDApp = DelIDsplit[2];
  var ValUniver = IDUniver.slice(1); // On vire "U" de l'ID
  var ValApp = IDApp.slice(3); // On vire "App" de l'ID
  UniDMX.Uni[ValUniver - 1].App[ValApp - 1].CanName.pop();
  UniDMX.Uni[ValUniver - 1].App[ValApp - 1].Can.pop();

  DMXLoad();
}

function RenCan(element) {
  // Renomme un paramètre
  // Exemple : element.id => SendCanRen_U1_App1_DMX5
  var CanRenID = element.id;
  var CanRenIDsplit = CanRenID.split("_");
  var IDUniver = CanRenIDsplit[1];
  var IDApp = CanRenIDsplit[2];
  var IDDMX = CanRenIDsplit[3];
  var ValUniver = IDUniver.slice(1); // On vire "U" de l'ID
  var ValApp = IDApp.slice(3); // On vire "App" de l'ID
  var ValDMX = IDDMX.slice(3); // On vire "DMX" de l'ID
  var NameForNewCan = "NameForNewCan_U" + ValUniver + "_App" + ValApp;
  var NewName = document.getElementById(NameForNewCan).value;
  UniDMX.Uni[ValUniver - 1].App[ValApp - 1].CanName[ValDMX - 1] = NewName;

  DMXLoad();
}
