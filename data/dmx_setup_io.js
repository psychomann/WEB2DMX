/**  Génération de paquets WebSocket ou request Gest / Post **/

// Envoi d'une modification sur l'univers
function SendDMXOrder(uni_nbr, canal, valeur) {
  // Composition d'un message
  
  console.log(
    "Message à envoyer sur l'univers (WSSS) N° " +
      uni_nbr +
      ", Canal : " +
      canal +
      " avec la valeur : " +
      valeur
  );

  console.log(
    "type : ws://" + uni_nbr + "/signal?c:" + canal + "&v:" + valeur
  );

  msg = canal + ":" + valeur ;
  WSSS.Socket[uni_nbr].send(msg);
}

