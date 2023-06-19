# WEB2DMX

## Description

https://www.figma.com/file/bGu6SpWa0BKyUcVy6yYZF0/Web2DMX?type=design&node-id=0%3A1&t=TJyl5QZQgQCwmE5H-1

Envoyer une requête depuis le Web (avec une page HTML ou une API) à un serveur embarqué sur une carte ESP (32 ou 8266) connecté en Wi-Fi sur un bus DMX (XLR 3 broches)

## Spécifications
 Interface de contrôle : Page web (auto-hébergé), requête par URL, message WebSocket, tant qu'à faire avec un paquet JSon
 Périphérique de destinations : Des lumières asservies en DMX
 Plateforme pour l'interface : ESP8266 (NodeCuV2 / D1 / ESP01 / ESP1S) ou ESP32 (ESP-WROOM-32)
 Langage, Protocoles : C++ / HTML / RS-485 / DMX / JavaScript / CSS / JSon / WebSockets 
 Libs & API : WifiManager / WS (WebSocket) ...
 IDE : Visual Studio + Platform.IO
 
## RoadMap

- Utilisez une librairie DMX pour envoyer des données de contrôle aux appareils DMX ... J'ai une librairie qui marche avec ESP8266 mais fait planter avec ESP32
- Utiliser une bibliothèque JSON envoyer des données JSON : Utilisez une bibliothèque telle que ArduinoJson (utiliser WebSocket comme passerelle ?)
- Ajouter un Feedback en synchronisant les pages connectés (avec WebSocket ?)
