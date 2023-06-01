/**  Fonctions en cas et de modification les valeurs **/

// Saisie d'une nouvelle valeur directement
function NewValCan(element) {
  // Modifie la valeur du paramètre
  // Exemple : element.id => SendCanRen_U1_App1_DMX5
  var NewValCanID = element.id;
  var NewValCansplit = NewValCanID.split("_");
  var IDUniver = NewValCansplit[1];
  var IDApp = NewValCansplit[2];
  var IDDMX = NewValCansplit[3];
  var ValUniver = IDUniver.slice(1); // On vire "U" de l'ID
  var ValApp = IDApp.slice(3); // On vire "App" de l'ID
  var ValDMX = IDDMX.slice(3); // On vire "DMX" de l'ID
  var ValForNewCan = "ValForNewCan_U" + ValUniver + "_App" + ValApp;
  var NewVal = document.getElementById(ValForNewCan).value;
  if (-1 < NewVal && NewVal < 128) {
    if (NewVal) {
      var parsed = parseInt(NewVal, 10);
    } else {
      parsed = 0;
    }
    UniDMX.Uni[ValUniver - 1].App[ValApp - 1].Can[ValDMX - 1] = parsed;
  }

  DMXLoad();

  var candmx =
    parseInt(UniDMX.Uni[ValUniver - 1].App[ValApp - 1].PosDMX) +
    parseInt(ValDMX) -
    1;
  SendDMXOrder(UniDMX.Uni[ValUniver - 1].IP, candmx, parsed);
}

// Quand un valeur est modifiée
function majvaleurslider(element) {
  var sliderID = element.id;
  var sliderValue = document.getElementById(element.id).value;
  var sliderDump = sliderID.slice(2);
  document.getElementById(sliderDump).innerHTML = sliderValue; // Mise à jour du texte du Slider
  sliderID = element.id;
  var sliceIDsplit = sliderID.split("_");
  var sliceUniver = sliceIDsplit[1]; // La partie Univers
  var sliceApp = sliceIDsplit[2]; // La partie App
  var sliceDMX = sliceIDsplit[3]; // La partie DMX
  var ValUniver = sliceUniver.slice(1); // On vire "U" de l'ID
  var ValApp = sliceApp.slice(3); // On vire "App"de l'ID
  var ValDMX = sliceDMX.slice(3); // On vire "DMX"de l'ID

  UniDMX.Uni[ValUniver - 1].App[ValApp - 1].Can[ValDMX - 1] = sliderValue; // Mise à jour du JSon
  DMX_JSon_Render();

  /***  Send information to ESP32/8266  ***/
  let can =
    parseInt(UniDMX.Uni[ValUniver - 1].App[ValApp - 1].PosDMX) +
    parseInt(ValDMX - 1);

  SendDMXOrder([ValUniver - 1], can, sliderValue);
}
