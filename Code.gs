function convertNumbers(input){
  const toEng = {'۰': '0',
                '۱': '1',
                '۲': '2',
                '۳': '3',
                '۴': '4',
                '۵': '5',
                '۶': '6',
                '۷': '7',
                '۸': '8',
                '۹': '9',
                '٠': '0',
                '١': '1',
                '٢': '2',
                '٣': '3',
                '٤': '4',
                '٥': '5',
                '٦': '6',
                '٧': '7',
                '٨': '8',
                '٩': '9'};
  for(var i = 0; i < input.length; i++){
    var digit = input[i];
    if(digit in toEng){
      input = input.replaceAll(digit, toEng[digit]);
    }
  }
  return input;
}

function fetchAndLog(url){
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

//################################################################################################################

function testing(){
  // Logger.log(getRowByKey("TEACHERS", "phone_number", "123"));
  Logger.log(logout(1234));
}

//################################################################################################################

function doPost(e){
  var contents = JSON.parse(e.postData.contents);
  
  var senderID = contents.message.from.id;

  var messageID = contents.message.message_id;
  var messageTxt = contents.message.text;

  var state = getState(senderID);
  if(ADMIN_IDs.includes(senderID)){
    if(messageTxt == "/cancel" || messageTxt == "/home" || messageTxt == "/help"){
      setState(senderID, "ADMIN_HOME");
      sendMessage(senderID, ADMIN_HOME_MSG);
    }
    else if(state){
      switch(state){
        case "ADMIN_HOME":{
          if(messageTxt == "/sendToAll"){
            setState(senderID, "SEND_TO_ALL");
            sendMessage(senderID, SEND_TO_ALL_MSG);
          }
          else if(messageTxt == "/forwardToAll"){
            setState(senderID, "FRW_TO_ALL");
            sendMessage(senderID, FRW_TO_ALL_MSG);
          }
        }break;

        case "SEND_TO_ALL":{          
          setState(senderID, "ADMIN_HOME");
          sendToAll(messageTxt);
          sendReply(senderID, MSG_SENT_DONE, messageID);
        }break;

        case "FRW_TO_ALL":{          
          setState(senderID, "ADMIN_HOME");
          forwardToAll(senderID, messageID);
          sendReply(senderID, MSG_SENT_DONE, messageID);
        }break;
      }
    }
    else{
      setState(senderID, "ADMIN_HOME");
      sendMessage(senderID, ADMIN_HOME_MSG);
    }
  }
  else if(messageTxt == "/cancel" || messageTxt == "/home" || messageTxt == "/help")
  {
    if(loggedIn(senderID)){
      setState(senderID, "HOME");
      sendMessage(senderID, TEACHERS_HOME_MSG);
    }
    else{
      setState(senderID, "PHONE_INPUT");
      sendReply(senderID, INPUT_PHONE_MSG, messageID);
    }
  }
  else if(loggedIn(senderID)){
      if(messageTxt == "/logout"){
        logout(senderID);
        setState(senderID, "PHONE_INPUT");
        sendMessage(senderID, INPUT_PHONE_MSG);
      }
      else{
        switch(state){
          case "HOME":{
            if(messageTxt == "/info"){
              sendMessage(senderID, getTeacherInfo(senderID));
            }
            else if(messageTxt == "/salary"){
              sendMessage(senderID, getTeacherSalary(senderID));
            }
            else if(messageTxt == "/edit"){
              sendMessage(senderID, EDIT_MENU_MSG);
            }
            else if(messageTxt == "/field"){
              setState(senderID, "EDIT_FIELD");
              sendMessage(senderID, LAST_FIELD_MSG);
            }
            else if(messageTxt == "/bank"){
              setState(senderID, "EDIT_BANK");
              sendMessage(senderID, BANK_ACCOUNT_MSG);
            }
            else if(messageTxt == "/photo"){
              setState(senderID, "SENDING_PHOTO");
              sendMessage(senderID, SCANNED_PHOTO_MSG);
            }
            else if(messageTxt == "/syllabus"){
              setState(senderID, "SENDING_SYLL");
              sendMessage(senderID, SYLLABUS_MSG);
            }
            else{
              sendMessage(senderID, ERR_FLW_THE_RULES);
            }
          }break;

          case "EDIT_FIELD":{
            setValueHavingKey("TEACHERS", "telegram_id", senderID, "last_field", messageTxt);
            setState(senderID, "HOME");
            sendMessage(senderID, CHANGE_DONE);
          }break;

          case "EDIT_BANK":{
            setValueHavingKey("TEACHERS", "telegram_id", senderID, "bank_account", convertNumbers(messageTxt));
            setState(senderID, "HOME");
            sendMessage(senderID, CHANGE_DONE);
          }break;

          case "SENDING_PHOTO":
          case "SENDING_SYLL":{
            notifyAdmins(senderID, state, messageID);
            setState(senderID, "HOME");
            sendMessage(senderID, CHANGE_DONE);
          }break;

        }
      }
  }
  else{
    if(state){
      switch(state){

        case "PHONE_INPUT":{
          if(setValueHavingKey("TEACHERS", "phone_number", convertNumbers(messageTxt), "telegram_id", senderID)){
            setState(senderID, "PASS_INPUT");
            sendReply(senderID, INPUT_PASS_MSG, messageID);
          }
          else{
            sendReply(senderID, ERR_PHONE_NOT_FOUND, messageID);
          }
        }break;

        case "PASS_INPUT":{
          if(registerTeacher(senderID, convertNumbers(messageTxt))){
            setState(senderID, "HOME");
            sendMessage(senderID, TEACHERS_HOME_MSG);
          }
          else{
            sendReply(senderID, ERR_WRONG_PASS, messageID);
          }
        }break;
      }
    }
    else{
      setState(senderID, "PHONE_INPUT");
      sendMessage(senderID, WELCOME_MSG);
      sendMessage(senderID, INPUT_PHONE_MSG);
    }
  }

}

//################################################################################################################

