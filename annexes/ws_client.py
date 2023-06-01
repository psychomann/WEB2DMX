# 1. install python
# 2. python.exe -m pip install --upgrade pip
# 3. pip install websocket-client
# 3. pi wsclient.py

import websocket

# Connection au serveur WebSocket
ws = websocket.WebSocket()
ws.connect("ws://127.0.0.1:1337/")
print("Connecté au serveur WebScoket")

# Demande au client une saisie et transmettre le message
str = input("Saisie quelque chose : ")
ws.send(str)

# Attent une réponse du serveur et l'affiche
result = ws.recv()
print("Reçu :",result)

# Cloture la communication
ws.close()
