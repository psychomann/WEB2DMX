/*
Basic websocket client and server
By : Aabdeen Ntourntou
Source :  https://www.youtube.com/watch?v=ArOIBlgARtk

Commandes d'ínitialisation dans la console :
> npm init -y
> npm i express ws
create server.js file

*/
// Librairie Websocket
const ws = require("ws");
// Librairie Express
const express = require("express");

const expressServer = express();

const wsServer = new ws.Server({
  server: expressServer.listen(1337),
  host: "localhost",
  path: "/",
});

wsServer.on("connection", (w) => {
    // console.log("Connexion");
    w.on("message", (msg) => {
        console.log("Message reçu :", msg);
        //renvoi le message au client
        w.send(msg);
    });
});

expressServer.listen(() => console.log("À l'écoute..."));

/* 
Start le server WebSocket avec la commande : 
> node ws_server.js
*/
