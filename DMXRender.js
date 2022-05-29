			// Structure au lancement
            // 1 Spot RGB sur canal 1 avec 3 paramètres sur univers 1 sur IP 162.168.0.77
			
            UniDMX = {"Uni":[
                {"ID":1,"IP":"127.0.0.1:80","App":[{"AppName":"LED RGB","PosDMX":1,"CanName":["Canal 1"],"Can":[63]}]},
                // {"ID":2,"IP":"127.0.0.1:9090","App":[{"AppName":"LED RGB","PosDMX":1,"CanName":["Canal 1"],"Can":[63]}]},
                // {"ID":3,"IP":"127.0.0.1:3000","App":[{"AppName":"LED RGB","PosDMX":1,"CanName":["Canal 1"],"Can":[63]}]},
                ]};        
            
            
            // Structure Minimal Vide
            function Config_Vide()
			{
                UniDMX = new Object();
                UniDMX.Uni = new Array();
                
                WSSS = new Object();
                WSSS.IP = new Array();
                WSSS.Socket = new Array();
                
                myOnLoad();
            }
            
             // Structure Démo 1
            function Config_Demo1()
			{
                
                UniDMX = {"Uni":[{"ID":1,"IP":"192.168.0.77","App":[{"AppName":"Lyre PT LED RGBAU + DS","PosDMX":2,"CanName":["Rouge","Vert","Bleu","Ambre","U-V","Dim","Strobe","Pan","Tilt"],"Can":[50,0,0,0,0,127,0,30,45]},{"AppName":"Spot RGB LED 4 Canaux","PosDMX":12,"CanName":["Rouge","Vert","Blue","Dim"],"Can":[127,63,36,127]}]},{"ID":2,"IP":"192.168.0.92","App":[{"AppName":"Spot RGB 3 Canaux","PosDMX":9,"CanName":["Rouge","Vert","Bleu"],"Can":[0,127,127]}]}]} ;

                Lan_generate();
                
                myOnLoad();
			}  
            
            // Structure Démo 2
            function Config_Demo2()
			{
                
                UniDMX = {"Uni":[{"ID":1,"IP":"127.168.0.77","App":[{"AppName":"Lyre PT LED RGBAU + DS","PosDMX":1,"CanName":["Rouge","Vert","Bleu","Ambre","U-V","Dim","Strobe","Pan","Tilt"],"Can":[50,0,0,0,0,127,0,30,45]},{"AppName":"Spot RGB LED 4 Canaux","PosDMX":12,"CanName":["Rouge","Vert","Blue","Dim"],"Can":[127,63,36,127]}]}]};

                myOnLoad();
			} 

function myOnLoad() // Rechargement total de la page
			{
                
                // Changement d'un fichier ?
                if (Load_UniDMX == true)
                    {
                        if (UniDMX_File)
                            UniDMX = JSON.parse(UniDMX_File);
                        else
                            console.log("Le chargement a échoué");
                        Load_UniDMX = false;
                    }

                DMX_HTML_Render(); // Rendu "visuel" de UniDMX
                
                DMX_JSon_Render(); // Rendu textuel de UniDMX en JSon
                
                if (!WSSS)
                    Lan_generate();
                Lan_Render(); // Rendu textuel de WSSS en JSon
                    
                
			}
			
            function DMX_JSon_Render() // (Re)chargement du rendu textuel
			{
				if (document.getElementById("JSonMode").checked)
				{
					let JSon_Render = JSON.stringify(UniDMX);
					JSon_Render += "<hr>";
					document.getElementById("DMX_JSon_Render").innerHTML = JSon_Render;
				}
				else
					document.getElementById("DMX_JSon_Render").innerHTML = "";
			}
            
			function DMX_HTML_Render() // (Re)chargement du rendu visuel
			{
				let HTML_Dump = "";
                
				// Géneration des univers DMX
                for (let i=0; i < UniDMX.Uni.length ; i++) {
					// Géneration d'un univers DMX
					HTML_Dump += "<div class=\"Uni_DMX\">";
					
					if (document.getElementById("ConfigMode").checked)
					{
						HTML_Dump += "<b><u>Univers : ";
                        HTML_Dump += UniDMX.Uni[i].ID;
                        HTML_Dump += "</u></b>";
                        HTML_Dump += " (IP : ";
                        HTML_Dump += UniDMX.Uni[i].IP;
                        
                        HTML_Dump += " <input id=\"";
                        HTML_Dump += "InputLan_U" + (i + 1);
                        HTML_Dump += "\" type=\"text\" placeholder=\"192.168.0.?\">";
                        
                        HTML_Dump += " <button id=\"";
                        HTML_Dump += "ModLan_U";
                        HTML_Dump += (i + 1);
                        HTML_Dump += "\" onclick=\"ModLan(this)\">Modifier</button>";
                        
                        HTML_Dump += " - App : ";
                        HTML_Dump += UniDMX.Uni[i].App.length;
                        HTML_Dump += " <button id=\"";
                        HTML_Dump += "AddApp_U";
                        HTML_Dump += (i + 1);
                        HTML_Dump += "\" onclick=\"AddApp(this)\">Ajouter</button>";
                        
                        HTML_Dump += " <button id=\"";
                        HTML_Dump += "DelApp_U";
                        HTML_Dump += (i + 1);
                        HTML_Dump += "\" onclick=\"DelApp(this)\">Supprimer</button>";
                        
                        HTML_Dump += ") <br> <br>";
					}
					else
					{
						HTML_Dump += "<h2>Univers : ";
                        HTML_Dump += UniDMX.Uni[i].ID;
                        HTML_Dump += " (IP : ";
                        HTML_Dump += UniDMX.Uni[i].IP;
                        if (document.getElementById("ConfigMode_Lan").checked)
                            {
                                HTML_Dump += " <input id=\"";
                                HTML_Dump += "InputLan_U" + (i + 1);
                                HTML_Dump += "\" type=\"text\" placeholder=\"192.168.0.?\">";
                                HTML_Dump += " <button id=\"";
                                HTML_Dump += "ModLan_U";
                                HTML_Dump += (i + 1);
                                HTML_Dump += "\" onclick=\"ModLan(this)\">Modifier</button>";
                            }

						HTML_Dump += " - Nombre appareils : ";
                        HTML_Dump += UniDMX.Uni[i].App.length;
                        
                        if (document.getElementById("ConfigMode_App").checked)
                            {
                                HTML_Dump += " <button id=\"";
                                HTML_Dump += "AddApp_U";
                                HTML_Dump += (i + 1);
                                HTML_Dump += "\" onclick=\"AddApp(this)\">Ajouter</button>";

                                HTML_Dump += " <button id=\"";
                                HTML_Dump += "DelApp_U";
                                HTML_Dump += (i + 1);
                                HTML_Dump += "\" onclick=\"DelApp(this)\">Supprimer</button>";
                        }
                        HTML_Dump += ")</h2>";
					}
                    
					// Géneration des appareils
					for (let k=0; k < UniDMX.Uni[i].App.length ; k++)
                    {
						// Géneration d'un appareil
						
						// Information de l'appareil
						HTML_Dump += "<div class=\"App_DMX\">";
						
						if (document.getElementById("ConfigMode").checked)
						{
                            
							HTML_Dump += "<b>" + (k + 1) + " - " + UniDMX.Uni[i].App[k].AppName;
							HTML_Dump += " <input id=\"";
							HTML_Dump += "InputRen_U" + (i + 1) + "_App" + (k + 1);
							HTML_Dump += "\" type=\"text\" placeholder=\"Renommer\">";
							HTML_Dump += "<button id=\"";
							HTML_Dump += "SendInputRen_U" + (i + 1) + "_App" + (k + 1);
							HTML_Dump += "\" onclick=\"RenApp(this)\">Modifier</button>";
							HTML_Dump += "</b> / Cnx : " + UniDMX.Uni[i].App[k].PosDMX;
							HTML_Dump += " (+" + UniDMX.Uni[i].App[k].Can.length + ")";
							HTML_Dump += " <input id=\"";
							HTML_Dump += "InputPosDMX_U" + (i + 1) + "_App" + (k + 1);
							HTML_Dump += "\" type=\"text\"  min=\"0\" max=\"2048\" placeholder=\"0~512\">";
							HTML_Dump += "<button id=\"";
							HTML_Dump += "SendInputPosDMX_U" + (i + 1) + "_App" + (k + 1); 
							HTML_Dump += "\" onclick=\"ModPosDMX(this)\">Modifier</button>";
                            
							HTML_Dump += "<ol>";
							
							for (let j=0; j < UniDMX.Uni[i].App[k].Can.length ; j++)
                            {				
								HTML_Dump += "<li>";
                                
                                // RenCan Button
                                HTML_Dump += " <button id=\"";
                                HTML_Dump += "SendCanRen_U" + (i + 1) + "_App" + (k + 1) + "_DMX" + (j + 1);
                                HTML_Dump += "\" onclick=\"RenCan(this)\">Ren</button> ";

								HTML_Dump += UniDMX.Uni[i].App[k].CanName[j] + " : ";
								HTML_Dump += "<span id=\"";
								HTML_Dump += "U" + (i + 1) + "_App" + (k + 1) + "_DMX" + (j + 1);
								HTML_Dump += "\">" + UniDMX.Uni[i].App[k].Can[j] + "</span>";
                                
                                HTML_Dump += "<input onchange=\"majvaleurslider(this)\" type=\"range\" min=\"0\" max=\"127\" class=\"slider\"";
								HTML_Dump += "id=\"";
								HTML_Dump += "S_U" + (i + 1) + "_App" + (k + 1) + "_DMX" + (j + 1);
								HTML_Dump += "\" value=\"" + UniDMX.Uni[i].App[k].Can[j] + "\">";
                                
                                // NewValCan Button
                                HTML_Dump += " <button id=\"";
                                HTML_Dump += "SendCanNewVal_U" + (i + 1) + "_App" + (k + 1) + "_DMX" + (j + 1);
                                HTML_Dump += "\" onclick=\"NewValCan(this)\">Valeur</button>";
                                
								HTML_Dump += "</li>";
							}
							HTML_Dump += "</ol>";
						}
						else
						{
							HTML_Dump += "<h3>Appareil " + (k + 1) + " - " + UniDMX.Uni[i].App[k].AppName;
                            
                            
                            if (document.getElementById("ConfigMode_App").checked)
                                {
                            HTML_Dump += " <input id=\"";
                                    HTML_Dump += "InputRen_U" + (i + 1) + "_App" + (k + 1);
                                    HTML_Dump += "\" type=\"text\" placeholder=\"Renommer\">";
                                    HTML_Dump += "<button id=\"";
                                    HTML_Dump += "SendInputRen_U" + (i + 1) + "_App" + (k + 1);
                                    HTML_Dump += "\" onclick=\"RenApp(this)\">Modifier</button>";
							
                                }
                            HTML_Dump += "</h3>";
                            HTML_Dump += "<ul>";
							HTML_Dump += "<li>Canal DMX : " + UniDMX.Uni[i].App[k].PosDMX;
                            
                            if (document.getElementById("ConfigMode_App").checked)
                                {
                                    HTML_Dump += " <input id=\"";
                                    HTML_Dump += "InputPosDMX_U" + (i + 1) + "_App" + (k + 1);
                                    HTML_Dump += "\" type=\"text\"  min=\"0\" max=\"2048\" placeholder=\"0~512\">";
                                    HTML_Dump += "<button id=\"";
                                    HTML_Dump += "SendInputPosDMX_U" + (i + 1) + "_App" + (k + 1); 
                                    HTML_Dump += "\" onclick=\"ModPosDMX(this)\">Modifier</button>";
                                }

                            HTML_Dump += "</li><li>Canaux DMX : " + UniDMX.Uni[i].App[k].Can.length + "</li></ul>";
							
							// Géneration des canaux
							HTML_Dump += "<div class=\"Canaux_DMX\">";
							HTML_Dump += "<ol>";
							
							for (let j=0; j < UniDMX.Uni[i].App[k].Can.length ; j++) {				
								// Géneration d'un canal
								HTML_Dump += "<div class=\"Canal_DMX\"><li>" + UniDMX.Uni[i].App[k].CanName[j] + " : ";
								// Géneration de l'ID Valeur
								HTML_Dump += "<span id=\"";
								HTML_Dump += "U" + (i + 1) + "_App" + (k + 1) + "_DMX" + (j + 1) + "\">" + UniDMX.Uni[i].App[k].Can[j];
								HTML_Dump += "</span>";
								// Géneration du slider
								HTML_Dump += "</li><div class=\"slidercontainer\">";
                                HTML_Dump += "<input ";
								HTML_Dump += "onchange=\"majvaleurslider(this)\" type=\"range\" min=\"0\" max=\"127\" class=\"slider\"";
								// Géneration de l'ID du  du canal
								HTML_Dump += "id=\"";
								HTML_Dump += "S_U" + (i + 1) + "_App" + (k + 1) + "_DMX" + (j + 1) + "\"";
								// Value par défault
								HTML_Dump += " value=\"" + UniDMX.Uni[i].App[k].Can[j] + "\">";
								// Géneration du slider terminé
								HTML_Dump += "</div>";
								// Géneration d'un canal terminé
								HTML_Dump += "</div>";
                                
                                if (document.getElementById("ConfigMode").checked || document.getElementById("ConfigMode_Can").checked)
                                {
                                    // RenCan Button
                                    HTML_Dump += " <button id=\"";
                                    HTML_Dump += "SendCanRen_U" + (i + 1) + "_App" + (k + 1) + "_DMX" + (j + 1);
                                    HTML_Dump += "\" onclick=\"RenCan(this)\">Renommer</button>";
									
                                    // NewValCan Button
                                    HTML_Dump += " <button id=\"";
                                    HTML_Dump += "SendCanNewVal_U" + (i + 1) + "_App" + (k + 1) + "_DMX" + (j + 1);
                                    HTML_Dump += "\" onclick=\"NewValCan(this)\">Valeur</button>";
								}
							}
							//  Géneration des canaux Terminé
							HTML_Dump += "</ol></div>";	
							//  Géneration de l'appareil Terminé
						}
						
						HTML_Dump += "</div>";
						
						if (document.getElementById("ConfigMode").checked || document.getElementById("ConfigMode_Can").checked)
						{
							HTML_Dump += "Paramètre : <input id=\"NameForNewCan_U" + (i + 1) + "_App" + (k + 1) + "\" type=\"text\" placeholder=\"Fonction\">";
							HTML_Dump += "<input id=\"ValForNewCan_U" + (i + 1) + "_App" + (k + 1);
							HTML_Dump += "\" type=\"text\" min=\"0\" max=\"127\" placeholder=\"0~127\">";
							HTML_Dump += "<button id=\"SendNewCan_U" + (i + 1) + "_App" + (k + 1);
							HTML_Dump += "\" onclick=\"AddCan(this)\">+</button>";
							HTML_Dump += "<button id=\"DelLastCan_U" + (i + 1) + "_App" + (k + 1);
							HTML_Dump += "\" onclick=\"DelCan(this)\">-</button>";
							HTML_Dump += "<br><br>";							
						}
					}
					//  Géneration de l'univers terminé
                    
                    if (document.getElementById("ConfigMode").checked)
						HTML_Dump += "</div><hr>";
                    
				}
                
                if (document.getElementById("ConfigMode").checked || document.getElementById("ConfigMode_Uni").checked)
                    {
                HTML_Dump += " <button id=\"AddUnivers\" onclick=\"AddUni(this)\">Ajouter un univers</button>";
                HTML_Dump += " <button id=\"DelUni\" onclick=\"DelUni(this)\">Supprimer un univers</button>";
                HTML_Dump += "<br>";
                }
                document.getElementById("DMX_HTML_Render").innerHTML = HTML_Dump;
			}
                        
            function Lan_Render() // (Re)chargement du rendu visuel
            {
                if (document.getElementById("ConfigMode_Lan").checked)
				{
                    // console.log("Nombre d'Univers " + UniDMX.Uni.length);
                    /*
                    for (i = 0; i < UniDMX.Uni.length ; i++)
                    {
                        // console.log("Univers : " + (i + 1) + ", adresse : " + UniDMX.Uni[i].IP);
                        WSSS.IP[i] = UniDMX.Uni[i].IP;
                        URL_Server = "ws://";
                        URL_Server += WSSS.IP[i];
                        URL_Server += "/";
                        console.log(URL_Server);
                        io(URL_Server);
                    }
                    
                    */
                    
                    // var iows = io("ws://127.0.0.1:9292/");
                    
					let Lan_Render = JSON.stringify(WSSS);    
                    Lan_Render += "<hr>";
					document.getElementById("Lan_Render").innerHTML = Lan_Render;
				}
				else
					document.getElementById("Lan_Render").innerHTML = "";
            }
