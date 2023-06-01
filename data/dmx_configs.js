/**  Structures dipsonibles au lancement **/
/*
 Présente : la valeur 63 pour le paramètres qui se nomme "Dim", du 1er canal, avec le numéro 1, de appareil qui se nomme "LED RGB" de l'univers 1 accessible depuis l'adresse IP 127.0.01 sur le port 80.
 Dit autrement :
 1 Univers sur le port 80 de l'adresse IP 127.0.01, avec 1 appareil qui se nomme "LED RGB" avec 1 Canal qui se nomme "Dim", canal numéro 1 avec la valeur 163.
*/
UniDMX = {
  Uni: [
    {
      ID: 1,
      IP: "192.168.0.77:1337",
      App: [{ AppName: "LED RGB", PosDMX: 1, CanName: ["Dim"], Can: [163] }],
    },
    // {"ID":2,"IP":"127.0.0.1:9090","App":[{"AppName":"LED RGB","PosDMX":1,"CanName":["Canal 1"],"Can":[63]}]},
    // {"ID":3,"IP":"127.0.0.1:3000","App":[{"AppName":"LED RGB","PosDMX":1,"CanName":["Canal 1"],"Can":[63]}]},
  ],
};

// Structure Démo 1
/*
Sur l'univers 1 à l'adrese IP 192.168.0.77, 2 Appareils ("Lyre PT LED RGBAU + DS" et "Spot RGB LED 4 Canaux" qui commence avec les cannaux respectifs 2 et 9)
"Lyre PT LED RGBAU + DS" possède 9 canaux qui ont des noms (Rouge, Vert ...) avec les valeurs indépendantes
*/
function Config_Demo1() {
  Lan_clean();

  UniDMX = {
    Uni: [
      {
        ID: 1,
        IP: "192.168.0.77:1337",
        App: [
          {
            AppName: "Lyre PT LED RGBAU + DS",
            PosDMX: 2,
            CanName: [
              "Rouge",
              "Vert",
              "Bleu",
              "Ambre",
              "U-V",
              "Dim",
              "Strobe",
              "Pan",
              "Tilt",
            ],
            Can: [50, 0, 0, 0, 0, 127, 0, 30, 45],
          },
          {
            AppName: "Spot RGB LED 4 Canaux",
            PosDMX: 12,
            CanName: ["Rouge", "Vert", "Blue", "Dim"],
            Can: [127, 63, 36, 127],
          },
        ],
      },
      {
        ID: 2,
        IP: "192.168.0.42:1337",
        App: [
          {
            AppName: "Spot RGB 3 Canaux",
            PosDMX: 9,
            CanName: ["Rouge", "Vert", "Bleu"],
            Can: [0, 127, 127],
          },
        ],
      },
    ],
  };

  Lan_generate();

  DMXLoad();
}

// Structure Démo 2
/*
Variante pour tester ...
*/
function Config_Demo2() {
  Lan_clean();

  UniDMX = {
    Uni: [
      {
        ID: 1,
        IP: "192.168.0.77:1337",
        App: [
          {
            AppName: "Lyre PT LED RGBAU + DS",
            PosDMX: 1,
            CanName: [
              "Rouge",
              "Vert",
              "Bleu",
              "Ambre",
              "U-V",
              "Dim",
              "Strobe",
              "Pan",
              "Tilt",
            ],
            Can: [50, 0, 0, 0, 0, 127, 0, 30, 45],
          },
          {
            AppName: "Spot RGB LED 4 Canaux",
            PosDMX: 12,
            CanName: ["Rouge", "Vert", "Blue", "Dim"],
            Can: [127, 63, 36, 127],
          },
        ],
      },
    ],
  };

  Lan_generate();

  DMXLoad();
}
