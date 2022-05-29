function SendDMXOrder(addresse, canal, valeur) // Composition d'un message
{
    // console.log("Massage à envoyer sur IP " + addresse + ", Canal " + canal + " avec la valeur " + valeur);
    // console.log("type : ws://" + addresse + "/signal?c:" + canal + "&v:" + valeur);
}

// Structure de démarrage vide
      
WSSS = new Object();
WSSS.IP = new Array();
WSSS.Socket = new Array();

WSSS = ""; // {"IP":[],"Socket":[]};
          
// const socket = io("localhost");
        
function Lan_generate()
{
    // console.log("WSSS : " + WSSS);
    
    if (!WSSS)
    {
        WSSS = new Object();
        WSSS.IP = new Array();
        WSSS.Socket = new Array();
    }
    
    /*
    for (i = 0; i < UniDMX.Uni.length ; i++)
    {
        // console.log("Univers : " + (i + 1) + ", adresse : " + UniDMX.Uni[i].IP);
        WSSS.IP[i] = UniDMX.Uni[i].IP;
        URL_Server = "http://";
        URL_Server += WSSS.IP[i];
        URL_Server += "/";
        // console.log(URL_Server);
        // const socket = io(URL_Server);
        // console.log(socket);
    }
    */

}

var socket = io("http://127.0.0.1/");
