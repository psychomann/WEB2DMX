/**  Ajout, suppression et modification de l'adresse d'un univers **/

// Ajoute un univers
function AddUni(element) {
  // Ajoute un univers à la fin du tableau
  // Incrément des univers disponibles
  var GalaxySize;
  GalaxySize = UniDMX.Uni.length;
  UniDMX.Uni.push();
  UniDMX.Uni[GalaxySize] = new Array();
  UniDMX.Uni[GalaxySize] = new Object();
  UniDMX.Uni[GalaxySize].ID = GalaxySize + 1;
  UniDMX.Uni[GalaxySize].IP = "192.168.0.77:1337";
  UniDMX.Uni[GalaxySize].App = new Array();

  Lan_clean();
  Lan_generate();
  DMXLoad();
}

// supprime un univers
function DelUni(element) {
  // Supprime le dernier univers du tableau
  var GalaxySize;
  GalaxySize = UniDMX.Uni.length;
  if (GalaxySize) {
    WSSS.IP.pop();
    UniDMX.Uni.pop();
  }
  
  Lan_clean();
  Lan_generate();
  DMXLoad();
}

// Modifie l'adresse d'un univers
function ModLan(element) {
  // Modifie l'adresse de l'univers
  // Exemple : element.id => InputLan_U1
  var LanUniID = element.id;
  var LanUniIDsplit = LanUniID.split("_");
  var IDUniver = LanUniIDsplit[1];
  var ValUniver = IDUniver.slice(1); // On vire "U" de l'ID
  var TextForNewLan = "InputLan_U" + ValUniver;
  var NewLan = document.getElementById(TextForNewLan).value;
  UniDMX.Uni[ValUniver - 1].IP = NewLan;
  
  Lan_clean();
  Lan_generate();
  DMXLoad();
}
