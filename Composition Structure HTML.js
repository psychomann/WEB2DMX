/*** JSon Structures  ***/

/***

Structure Canal_Appareil {str Nom, int Valeur}
avec 0 <= Valeur <= 127

Strucure Appareil { str Nom, int PosDMX, Canal_Appareil[] }
avec 0 < PosDMX (Canal DMX de Référence) <= taille de l'univers (128/512/1024/2048)

Structure Univers { int ID, str IP, Appareil[] }

Struct UniDMX = Univers[]

***/

/***
// Structure Exemple Etendue
//   1 Lyre RGBAU + PTZ    sur canal 2     avec 9 paramètres
// + 1 Spot RGBD           sur canal 12    avec 4 paramètres
// + 1 Spot RGB            sur canal 21    avec 3 paramètres
// sur IP 162.168.0.77 (Univers 1)
// avec 
//  1 Spot RGB             sur canal 9     avec 3 paramètres
// sur IP 162.168.0.92 (Univers 2)

// JSon version
                          
UniDMX = {"Uni":[{"ID":1,"IP":"192.168.0.77","App":[{"AppName":"Lyre PT LED RGBAU + DS","PosDMX":2,"CanName":["Rouge","Vert","Bleu","Ambre","U-V","Dim","Strobe","Pan","Tilt"],"Can":[50,0,0,0,0,127,0,30,45]},{"AppName":"Spot RGB LED 4 Canaux","PosDMX":12,"CanName":["Rouge","Vert","Blue","Dim"],"Can":[127,63,36,127]}]},{"ID":2,"IP":"192.168.0.92","App":[{"AppName":"Spot RGB 3 Canaux","PosDMX":9,"CanName":["Rouge","Vert","Bleu"],"Can":[0,127,127]}]}]} ;

// Génération en Javascript: 

UniDMX = new Object(); // Classe Invers DMX
UniDMX.Uni = new Array(); // La table globale des Univers
UniDMX.Uni[0] = new Object(); // Un univers constitué d'un ID, IP et d'appareils
UniDMX.Uni[0].ID = 1;
UniDMX.Uni[0].IP = "192.168.0.77";
UniDMX.Uni[0].App = new Array();

// Premier Appareil

UniDMX.Uni[0].App[0] = new Object();
UniDMX.Uni[0].App[0].AppName = "Lyre PT LED RGBAU + DS";
UniDMX.Uni[0].App[0].PosDMX = 1;

// Les paramètres

UniDMX.Uni[0].App[0].CanName = new Array();
UniDMX.Uni[0].App[0].CanName[0] = "Rouge";
UniDMX.Uni[0].App[0].CanName[1] = "Vert";
UniDMX.Uni[0].App[0].CanName[2] = "Bleu";

UniDMX.Uni[0].App[0].Can = new Array();
UniDMX.Uni[0].App[0].Can[0] = 50;
UniDMX.Uni[0].App[0].Can[1] = 0;
UniDMX.Uni[0].App[0].Can[2] = 0;

UniDMX.Uni[0].App[0].CanName[3] = "Ambre";
UniDMX.Uni[0].App[0].CanName[4] = "U-V";
UniDMX.Uni[0].App[0].CanName[5] = "Dim";
UniDMX.Uni[0].App[0].CanName[6] = "Strobe";
UniDMX.Uni[0].App[0].CanName[7] = "Pan";
UniDMX.Uni[0].App[0].CanName[8] = "Tilt";

UniDMX.Uni[0].App[0].Can[3] = 0;
UniDMX.Uni[0].App[0].Can[4] = 0;
UniDMX.Uni[0].App[0].Can[5] = 127;
UniDMX.Uni[0].App[0].Can[6] = 0;
UniDMX.Uni[0].App[0].Can[7] = 30;
UniDMX.Uni[0].App[0].Can[8] = 45;

// Deuxième appareil

UniDMX.Uni[0].App[1] = new Object();
UniDMX.Uni[0].App[1].AppName = "Spot RGB LED 4 Canaux";
UniDMX.Uni[0].App[1].PosDMX = 12;

UniDMX.Uni[0].App[1].CanName = new Array();
UniDMX.Uni[0].App[1].CanName[0] = "Rouge";
UniDMX.Uni[0].App[1].CanName[1] = "Vert";
UniDMX.Uni[0].App[1].CanName[2] = "Blue";
UniDMX.Uni[0].App[1].CanName[3] = "Dim";

UniDMX.Uni[0].App[1].Can = new Array();
UniDMX.Uni[0].App[1].Can[0] = 127;
UniDMX.Uni[0].App[1].Can[1] = 63;
UniDMX.Uni[0].App[1].Can[2] = 36;
UniDMX.Uni[0].App[1].Can[3] = 127;

// Troisième appareil

UniDMX.Uni[0].App[2] = new Object();
UniDMX.Uni[0].App[2].AppName = "Spot RGB LED 3 Canaux";
UniDMX.Uni[0].App[2].PosDMX = 21;

UniDMX.Uni[0].App[2].CanName = new Array();
UniDMX.Uni[0].App[2].CanName[0] = "Rouge";
UniDMX.Uni[0].App[2].CanName[1] = "Vert";
UniDMX.Uni[0].App[2].CanName[2] = "Blue";

UniDMX.Uni[0].App[2].Can = new Array();
UniDMX.Uni[0].App[2].Can[0] = 0;
UniDMX.Uni[0].App[2].Can[1] = 127;
UniDMX.Uni[0].App[2].Can[2] = 0;

UniDMX.Uni[1] = new Object(); // Un univers constitué d'un ID et d'appareils
UniDMX.Uni[1].ID = 2;
UniDMX.Uni[1].IP = "127.168.0.92";
UniDMX.Uni[1].App = new Array();

UniDMX.Uni[1].App[0] = new Object();
UniDMX.Uni[1].App[0].AppName = "Spot RGB 3 Canaux";
UniDMX.Uni[1].App[0].PosDMX = 9;

UniDMX.Uni[1].App[0].CanName = new Array();
UniDMX.Uni[1].App[0].CanName[0] = "Rouge";
UniDMX.Uni[1].App[0].CanName[1] = "Vert";
UniDMX.Uni[1].App[0].CanName[2] = "Bleu";

UniDMX.Uni[1].App[0].Can = new Array();
UniDMX.Uni[1].App[0].Can[0] = 0;
UniDMX.Uni[1].App[0].Can[1] = 127;
UniDMX.Uni[1].App[0].Can[2] = 127;

UniDMX.Uni[1].App[1] = new Object();
UniDMX.Uni[1].App[1].AppName = "Spot RGB 4 Canaux";
UniDMX.Uni[1].App[1].PosDMX = 2;

UniDMX.Uni[1].App[1].CanName = new Array();
UniDMX.Uni[1].App[1].CanName[0] = "Rouge";
UniDMX.Uni[1].App[1].CanName[1] = "Vert";
UniDMX.Uni[1].App[1].CanName[2] = "Blue";
UniDMX.Uni[1].App[1].CanName[3] = "Dim";

UniDMX.Uni[1].App[1].Can = new Array();
UniDMX.Uni[1].App[1].Can[0] = 127;
UniDMX.Uni[1].App[1].Can[1] = 77;
UniDMX.Uni[1].App[1].Can[2] = 33;
UniDMX.Uni[1].App[1].Can[3] = 127;

***/

/***
// Structure Exemple Etendue 2

UniDMX = {"Uni":[{"ID":1,"IP":"127.168.0.77","App":[{"AppName":"Lyre PT LED RGBAU + DS","PosDMX":1,"CanName":["Rouge","Vert","Bleu","Ambre","U-V","Dim","Strobe","Pan","Tilt"],"Can":[50,0,0,0,0,127,0,30,45]},{"AppName":"Spot RGB LED 4 Canaux","PosDMX":12,"CanName":["Rouge","Vert","Blue","Dim"],"Can":[127,63,36,127]}]}]};

***/
