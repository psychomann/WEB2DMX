# WEB2DMX

## Description

https://www.figma.com/file/bGu6SpWa0BKyUcVy6yYZF0/Web2DMX?type=design&node-id=0%3A1&t=TJyl5QZQgQCwmE5H-1

Envoyer une requête depuis le Web (avec une page HTML ou une API) à un serveur embarqué sur une carte ESP (32 ou 8266) connecté en Wi-Fi sur un bus DMX (XLR 3 broches)

## Spécifications
 Interface de contrôle : Page web (autohébergé), requête par URL, message WebSocket, tant qu'à faire avec un paquet JSon
 Périphérique de destinations : Des lumières asservies en DMX
 Plateforme pour l'interface : ESP8266 (NodeCuV2 / D1 / ESP01 / ESP1S) ou ESP32 (ESP-WROOM-32)
 Langage, Protocoles : C++ / HTML / RS-485 / DMX / JavaScript / CSS / JSon / WebSockets 
 Libs & API : WifiManager / WS (WebSocket) / Socket.IO / Ajax, Ajaj, Reac ... ?
 IDE : Arduino IDE / Visual Studio
 
## RoadMap (by ChatGPT qui à rédigé ça plutot vite et bien)

Il est possible de construire une interface ESP8266 qui utilise des paquets JSON via WebSockets et une librairie DMX pour contrôler des appareils DMX. Voici les étapes générales pour le faire:

- Configurer l'ESP8266 en tant que serveur WebSocket: utilisez un framework de communication WebSocket tel que l'Arduino WebSockets pour configurer l'ESP8266 en tant que serveur WebSocket. Cela permettra à l'ESP8266 de recevoir des données à partir d'un client WebSocket connecté.
- Utiliser une bibliothèque JSON pour lire les données JSON: Utilisez une bibliothèque telle que ArduinoJson pour lire les données JSON envoyées à l'ESP8266 par le client WebSocket.
- Utilisez une librairie DMX pour envoyer des données de contrôle aux appareils DMX: Utilisez une bibliothèque telle que DMXSerial pour envoyer des données de contrôle aux appareils DMX connectés.
- Assurez-vous que l'ESP8266 est connecté à un réseau Wi-Fi et qu'il a une adresse IP valide.
- Assurez-vous que vous utilisez des câbles DMX pour connecter les appareils DMX à l'ESP8266.

Il est important de noter que la programmation d'un tel projet peut être complexe et nécessiter des connaissances en matière de programmation et de réseau. Il peut donc être nécessaire de consulter la documentation des bibliothèques et des frameworks utilisés pour mieux comprendre comment les utiliser.
