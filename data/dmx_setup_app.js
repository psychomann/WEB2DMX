/**  Ajout, suppression, renomage et mofifications du canal DMX de référence d'un appareil **/

// Ajoute un appareil
function AddApp(element) {
  // Ajoute un appareil à la fin du tableau
  var AddAppID = element.id;
  var IDsplit = AddAppID.split("_");
  var IDUni = IDsplit[1];
  var ValUniver = IDUni.slice(1); // On vire "U"de l'ID
  var AppPos = UniDMX.Uni[ValUniver - 1].App.length;
  UniDMX.Uni[ValUniver - 1].App[AppPos] = new Object();
  UniDMX.Uni[ValUniver - 1].App[AppPos].CanName = new Array();
  UniDMX.Uni[ValUniver - 1].App[AppPos].Can = new Array();
  UniDMX.Uni[ValUniver - 1].App[AppPos].AppName = "Appareil ";
  UniDMX.Uni[ValUniver - 1].App[AppPos].AppName += AppPos + 1;
  UniDMX.Uni[ValUniver - 1].App[AppPos].PosDMX = 1;

  DMXLoad();
}

// Supprime un appareil
function DelApp(element) {
  // Supprime le dernier appareil à la fin du tableau
  var DelAppUniID = element.id;
  var DelAppUnisplit = DelAppUniID.split("_");
  var DelAppUni = DelAppUnisplit[1];
  var ValUniver = DelAppUni.slice(1); // On vire "U"de l'ID
  if (UniDMX.Uni[ValUniver - 1].App.length) {
    UniDMX.Uni[ValUniver - 1].App.pop();
  }
  DMXLoad();
}

// Renomme un appareil
function RenApp(element) {
  // Renomme l'appareil
  var RenID = element.id;
  var RenIDsplit = RenID.split("_");
  var IDUniver = RenIDsplit[1];
  var IDApp = RenIDsplit[2];
  var ValUniver = IDUniver.slice(1); // On vire "U"de l'ID
  var ValApp = IDApp.slice(3); // On vire "App"de l'ID
  var IDNewName = RenID.slice(4); // On vire "Send"de l'ID
  var NewName = document.getElementById(IDNewName).value;
  if (NewName) {
    UniDMX.Uni[ValUniver - 1].App[ValApp - 1].AppName = NewName;
  }

  DMXLoad();
}

// Modifie le canal DMX de référence
function ModPosDMX(element) {
  // Modifie la canal DMX de l'appareil
  var PosDMXID = element.id;
  var PosDMXIDsplit = PosDMXID.split("_");
  var IDUniver = PosDMXIDsplit[1];
  var IDApp = PosDMXIDsplit[2];
  var ValUniver = IDUniver.slice(1); // On vire "U"de l'ID
  var ValApp = IDApp.slice(3); // On vire "App"de l'ID
  var IDNewPosDMX = PosDMXID.slice(4); // On vire "Send"de l'ID
  var NewPosDMX = document.getElementById(IDNewPosDMX).value;
  if (0 < NewPosDMX && NewPosDMX < 2048) {
    UniDMX.Uni[ValUniver - 1].App[ValApp - 1].PosDMX = NewPosDMX;
  }

  DMXLoad();
}
