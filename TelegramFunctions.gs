function setWebhook() {
  var url = TELEGRAM_URL + "/setWebhook?url=" + WEBAPP_URL;
  fetchAndLog(url);
}

function sendMessage(receiverID, txtMessage){
  var url = TELEGRAM_URL + "/sendMessage?chat_id=" + receiverID + "&text=" + encodeURIComponent(txtMessage);
  fetchAndLog(url);
}

function sendMessageWithKeyboard(id, text, keyboard){
  var url = TELEGRAM_URL + "/sendMessage?chat_id=" + id + "&text=" + encodeURIComponent(text) + "&reply_markup=" + encodeURIComponent(JSON.stringify(keyboard));
  fetchAndLog(url);
}

function sendReply(recieverID, txtMessage, messageID){
  var url = TELEGRAM_URL + "/sendMessage?chat_id=" + recieverID + "&text=" + encodeURIComponent(txtMessage) + "&reply_to_message_id=" + messageID;
  fetchAndLog(url);
}

function forwardMessage(senderID, messageID, recieverID){
  var url = TELEGRAM_URL + "/forwardMessage?chat_id=" + recieverID + "&from_chat_id=" + senderID + "&message_id=" + messageID;
  fetchAndLog(url);
}