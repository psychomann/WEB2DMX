 // Modification des univers
            
            function AddUni(element) // Ajoute un univers à la fin du tableau
            {
				// Incrément des univers disponibles
				var GalaxySize;
				GalaxySize = UniDMX.Uni.length;
				UniDMX.Uni.push();
				UniDMX.Uni[GalaxySize] = new Array();
				UniDMX.Uni[GalaxySize] = new Object();
				UniDMX.Uni[GalaxySize].ID = (GalaxySize + 1);
                UniDMX.Uni[GalaxySize].IP = "127.0.0.1";
                UniDMX.Uni[GalaxySize].App = new Array();
				                
				myOnLoad();
			}
            
            function DelUni(element) // Supprime le dernier univers du tableau
            {
                var GalaxySize = UniDMX.Uni.length;
                if (GalaxySize)
                    UniDMX.Uni.pop();

                myOnLoad();
			}
            
            function ModLan(element) // Modifie l'adresse de l'univers
            {
				// Exemple : element.id => InputLan_U1
				var LanUniID = element.id;			
				var LanUniIDsplit = LanUniID.split("_");
				var IDUniver = LanUniIDsplit[1];
				var ValUniver = IDUniver.slice(1); // On vire "U" de l'ID
				var TextForNewLan = "InputLan_U" + ValUniver;
				var NewLan = document.getElementById(TextForNewLan).value;
				UniDMX.Uni[(ValUniver - 1)].IP = NewLan;
				
				myOnLoad();
			}
            
            UniDMX_File = "";
            Load_UniDMX = false;
            
            function LoadFileDMXJSon()
            {
                let file = document.getElementById("LoadFile").files[0];
                let fileReader = new FileReader();
                fileReader.readAsText(file);
                fileReader.onload = function() { UniDMX_File = fileReader.result; Load_UniDMX = true; myOnLoad(); };
                fileReader.onerror = function() { alert(fileReader.error); };
            }
            
            function SaveFileDMXJSon()
            {  
                console.log(JSON.stringify(UniDMX));
            }   
            
            // Modification des Appareils
            
			function AddApp(element) // Ajoute un appareil à la fin du tableau
			{
				var AddAppID = element.id;
                var IDsplit = AddAppID.split("_");
                var IDUni = IDsplit[1];
                var ValUniver = IDUni.slice(1); // On vire "U"de l'ID          
                var AppPos = UniDMX.Uni[(ValUniver - 1)].App.length;      
                UniDMX.Uni[(ValUniver -1)].App[AppPos] = new Object();
                UniDMX.Uni[(ValUniver -1)].App[AppPos].CanName = new Array();
                UniDMX.Uni[(ValUniver -1)].App[AppPos].Can = new Array();
                UniDMX.Uni[(ValUniver -1)].App[AppPos].AppName = "Appareil ";
                UniDMX.Uni[(ValUniver -1)].App[AppPos].AppName += (AppPos + 1) ;
			    UniDMX.Uni[(ValUniver -1)].App[AppPos].PosDMX = 1;
                
				myOnLoad();
			}
            
            function DelApp(element) // Supprime le dernier appareil à la fin du tableau
			{
                var DelAppUniID = element.id;
				var DelAppUnisplit = DelAppUniID.split("_");
                var DelAppUni = DelAppUnisplit[1];
                var ValUniver = DelAppUni.slice(1); // On vire "U"de l'ID
                if (UniDMX.Uni[(ValUniver - 1)].App.length)
					UniDMX.Uni[(ValUniver - 1)].App.pop();
                
                myOnLoad();
			}
            
            function ModPosDMX(element) // Modifie la canal DMX de l'appareil
            {
				var PosDMXID = element.id;
				var PosDMXIDsplit = PosDMXID.split("_");
				var IDUniver = PosDMXIDsplit[1];
				var IDApp = PosDMXIDsplit[2];
				var ValUniver = IDUniver.slice(1); // On vire "U"de l'ID
				var ValApp = IDApp.slice(3); // On vire "App"de l'ID
				var IDNewPosDMX = PosDMXID.slice(4); // On vire "Send"de l'ID
				var NewPosDMX = document.getElementById(IDNewPosDMX).value;
				if (0 < NewPosDMX && NewPosDMX < 2048)
					UniDMX.Uni[(ValUniver - 1)].App[(ValApp - 1)].PosDMX = NewPosDMX;
			
                myOnLoad();
			}
            
            function RenApp(element) // Renomme l'appareil
            {
				
				var RenID = element.id;
				var RenIDsplit = RenID.split("_");
				var IDUniver = RenIDsplit[1];
				var IDApp = RenIDsplit[2];
				var ValUniver = IDUniver.slice(1); // On vire "U"de l'ID
				var ValApp = IDApp.slice(3); // On vire "App"de l'ID
				var IDNewName = RenID.slice(4); // On vire "Send"de l'ID
				var NewName = document.getElementById(IDNewName).value
				if (NewName)
					UniDMX.Uni[(ValUniver - 1)].App[(ValApp - 1)].AppName = NewName;
								
				myOnLoad();
			}
            
            // Modification des Paramètres
            
            function AddCan(element) // Ajoute un paramètre à la fin du tableau
			{
				// Exemple : element.id = SendNewCan_U1_App1
                var CanAddID = element.id;
				var CanAddIDsplit = CanAddID.split("_");
				var IDUniver = CanAddIDsplit[1];
				var IDApp = CanAddIDsplit[2];
				var ValUniver = IDUniver.slice(1); // On vire "U" de l'ID
				var ValApp = IDApp.slice(3); // On vire "App" de l'ID
                var Nbr_app = UniDMX.Uni[(ValUniver - 1)].App[(ValApp - 1)].Can.length;
                var NameForNewCan = "NameForNewCan_U" + ValUniver + "_App" + ValApp; 
                var InputRegVal = "ValForNewCan_U" + ValUniver + "_App" + ValApp;
                var NewName = document.getElementById(NameForNewCan).value;
                var NewVal = document.getElementById(InputRegVal).value;              
                if ((-1) < NewVal && NewVal < 128)
				{
					UniDMX.Uni[(ValUniver - 1)].App[(ValApp - 1)].CanName.push(NewName);
					UniDMX.Uni[(ValUniver - 1)].App[(ValApp - 1)].Can.push(NewVal);
				}
                
                myOnLoad();
			}
            
            function DelCan(element) // Supprime le dernier paramètre à la fin du tableau
			{
                // Exemple : element.id = "DelLastCan_U1_App1"
                var DelID = element.id;
				var DelIDsplit = DelID.split("_");
				var IDUniver = DelIDsplit[1];
				var IDApp = DelIDsplit[2];
				var ValUniver = IDUniver.slice(1); // On vire "U" de l'ID
				var ValApp = IDApp.slice(3); // On vire "App" de l'ID
                UniDMX.Uni[(ValUniver - 1)].App[(ValApp - 1)].CanName.pop();
				UniDMX.Uni[(ValUniver - 1)].App[(ValApp - 1)].Can.pop();
                
				myOnLoad();
			}
            
            function RenCan(element) // Renomme un paramètre
            {
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
				UniDMX.Uni[(ValUniver - 1)].App[(ValApp - 1)].CanName[(ValDMX - 1)] = NewName;
				
				myOnLoad();
			}
            
            function NewValCan(element) // Modifie la valeur du paramètre
            {
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
                if (((-1) < NewVal) && (NewVal < 128))
				{
					if (NewVal)
					var parsed = parseInt(NewVal, 10);
					else
					parsed = 0;
                    UniDMX.Uni[(ValUniver - 1)].App[(ValApp - 1)].Can[(ValDMX - 1)] = parsed;    
				}
                
                myOnLoad();
			}
            
            function majvaleurslider(element)
            {
				var sliderID = element.id;
				var sliderValue = document.getElementById(element.id).value;
				var sliderDump = sliderID.slice(2);
				document.getElementById(sliderDump).innerHTML = sliderValue; // Mise à jour du texte du Slider
				sliderID = element.id;
				var sliceIDsplit = sliderID.split("_");
				var sliceUniver = sliceIDsplit[1]; // La partie Univers
				var sliceApp = sliceIDsplit[2]; // La partie App
				var sliceDMX = sliceIDsplit[3]; // La partie DMX
				var ValUniver = sliceUniver.slice(1);  // On vire "U" de l'ID
				var ValApp = sliceApp.slice(3); // On vire "App"de l'ID
				var ValDMX = sliceDMX.slice(3); // On vire "DMX"de l'ID
                
                UniDMX.Uni[(ValUniver - 1)].App[(ValApp - 1)].Can[(ValDMX - 1)] = sliderValue; // Mise à jour du JSon
                DMX_JSon_Render();
				                
                /***  Send information to ESP32/8266  ***/
                // websocket.send(Number + "s" + Value.toString());
                let can = parseInt(UniDMX.Uni[(ValUniver - 1)].App[(ValApp - 1)].PosDMX) + parseInt(ValDMX - 1 );
                
                // console.log("Canal : " + can);
                
                SendDMXOrder(UniDMX.Uni[(ValUniver - 1)].IP, can, sliderValue);
                            
			}
