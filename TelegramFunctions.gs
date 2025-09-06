/**
 * Sets the webhook for the Telegram bot.
 */
function setWebhook() {
  var url = TELEGRAM_URL + "/setWebhook?url=" + WEBAPP_URL;
  fetchAndLog(url);
}

/**
 * Sends a text message to a specified chat.
 * @param {string} receiverID The ID of the chat to send the message to.
 * @param {string} txtMessage The text of the message to send.
 */
function sendMessage(receiverID, txtMessage){
  var url = TELEGRAM_URL + "/sendMessage?chat_id=" + receiverID + "&text=" + encodeURIComponent(txtMessage);
  fetchAndLog(url);
}

/**
 * Sends a message with a custom keyboard.
 * @param {string} id The ID of the chat to send the message to.
 * @param {string} text The text of the message.
 * @param {object} keyboard The keyboard to send with the message.
 */
function sendMessageWithKeyboard(id, text, keyboard){
  var url = TELEGRAM_URL + "/sendMessage?chat_id=" + id + "&text=" + encodeURIComponent(text) + "&reply_markup=" + encodeURIComponent(JSON.stringify(keyboard));
  fetchAndLog(url);
}

/**
 * Sends a reply to a specific message.
 * @param {string} recieverID The ID of the chat to send the message to.
 * @param {string} txtMessage The text of the message to send.
 * @param {string} messageID The ID of the message to reply to.
 */
function sendReply(recieverID, txtMessage, messageID){
  var url = TELEGRAM_URL + "/sendMessage?chat_id=" + recieverID + "&text=" + encodeURIComponent(txtMessage) + "&reply_to_message_id=" + messageID;
  fetchAndLog(url);
}

/**
 * Forwards a message from one chat to another.
 * @param {string} senderID The ID of the chat where the message was originally sent.
 * @param {string} messageID The ID of the message to forward.
 * @param {string} recieverID The ID of the chat to forward the message to.
 */
function forwardMessage(senderID, messageID, recieverID){
  var url = TELEGRAM_URL + "/forwardMessage?chat_id=" + recieverID + "&from_chat_id=" + senderID + "&message_id=" + messageID;
  fetchAndLog(url);
}