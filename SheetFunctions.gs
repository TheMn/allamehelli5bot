function notifyAdmins(userID, state, messageID){
  var row = getRowByKey("TEACHERS", "telegram_id", userID),
      name = row["first_name"] + ' ' + row["last_name"],
      notifyMessage = name + ' ',
      keyName = "has_photo";
  if(state == "SENDING_PHOTO"){
    notifyMessage += "#عکس جدید فرستاد.";
  }
  else if(state == "SENDING_SYLL"){
    notifyMessage += "#طرح_درس جدید فرستاد.";
    keyName = "course_syllabus";
  }
  for (var i = 0; i < ADMIN_IDs.length; i++){
    sendMessage(ADMIN_IDs[i], notifyMessage);
    forwardMessage(userID, messageID, ADMIN_IDs[i]);
  }
  setValueHavingKey("TEACHERS", "telegram_id", userID, keyName, "*");
  return true;
}

function sendToAll(textMessage){
  var spreadSheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spreadSheet.getSheetByName("PEOPLE");
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++){
    sendMessage(data[i][0], textMessage);
  }
  return true;
}

function forwardToAll(senderID, messageID){
  var spreadSheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spreadSheet.getSheetByName("PEOPLE");
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++){
    forwardMessage(senderID, messageID, data[i][0]);
  }
  return true;
}

/**
 * وضعیت فعلی برگردانده می‌شود
 * 
 * @param senderID آیدی
 * @return {object}
 */
function getState(senderID){
  var spreadSheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spreadSheet.getSheetByName("STATES");
  var data = sheet.getDataRange().getValues();

  var targetColumn = -1, idColumn = -1;
  for (var i = 0; i < data[0].length; i++){
    if(data[0][i] == "state_name")
      targetColumn = i;
    if(data[0][i] == "telegram_id")
      idColumn = i;
  }

  for (var i = 0; i < data.length; i++) { 
    if(data[i][idColumn] == senderID){
      return data[i][targetColumn];
    }
  }
  return false;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * وضعیت آپدیت می‌شود
 * 
 * @param {string} senderID آیدی
 * @param {string} stateName نام وضعیت جدید
 * @return {object}
 */
function setState(senderID, stateName){
  var flag = false;

  var spreadSheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spreadSheet.getSheetByName("STATES");
  var data = sheet.getDataRange().getValues();

  var targetColumn = -1, idColumn = -1;
  for (var i = 0; i < data[0].length; i++){
    if(data[0][i] == "state_name")
      targetColumn = i;
    if(data[0][i] == "telegram_id")
      idColumn = i;
  }

  var targetRow = -1;
  for (var i = 0; i < data.length; i++) { 
    if(data[i][idColumn] == senderID){
      targetRow = i;
      break;
    }
  }
  if(targetRow == -1){
    targetRow = data.length;
    var cell = sheet.getRange(targetRow+1, idColumn+1);
    cell.setValue(senderID);
    flag = true;
  }

  if(targetColumn >= 0 && targetRow >= 0){
    var cell = sheet.getRange(targetRow+1, targetColumn+1);
    cell.setValue(stateName);
    flag = true;
  }
  return flag;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * یک ردیف را با داشتن کد تلگرام می یابیم
 * 
 * @param {string} sheetName اسم شیتی که توش باید بگردیم
 * @param {string} keyName نام کلید مناسب برای یافتن
 * @param {number} keyValue مقدار کلید در دسترس
 * @return {object} 
 */
function getRowByKey(sheetName, keyName, keyValue){
  var spreadSheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spreadSheet.getSheetByName(sheetName);
  var data = sheet.getDataRange().getValues();

  var idColumn = -1;
  var first_row = data[0];

  for (var i = 0; i < first_row.length; i++){
    if(first_row[i] == keyName){
      idColumn = i;
      break;
    }
  }

  var row = [];
  for (var i = 0; i < data.length; i++) { 
    if(data[i][idColumn] == keyValue){
      if(data[i][idColumn] !== ""){
        row = data[i];
        break;
      }
    }
  }
  
  if(row.length == 0)
    return false;
  else{
    var result = {};
    first_row.forEach((k, v) => result[k] = row[v]);
    return result;
  }
}

/**
 * یک ردیف را از جدول حذف می‌کند
 * 
 * @param {string} sheetName اسم شیتی که درون آن می‌گردیم
 * @param {string} keyName اسم کلیدی که آن را در اختیار داریم
 * @param {string} keyValue مقدار کلیدی که در دسترس است
 * @return {object}
 */
function deleteRowHavingKey(sheetName, keyName, keyValue){
  var spreadSheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spreadSheet.getSheetByName(sheetName);
  var data = sheet.getDataRange().getValues();

  var idColumn = -1;
  var first_row = data[0];

  for (var i = 0; i < first_row.length; i++){
    if(first_row[i] == keyName){
      idColumn = i;
      break;
    }
  }

  var row_id = -1;
  for (var i = 0; i < data.length; i++) { 
    if(data[i][idColumn] == keyValue){
      if(data[i][idColumn] !== ""){
        row_id = i+1;
        break;
      }
    }
  }
  
  if(row_id == -1)
    return false;
  else{
    sheet.deleteRow(row_id);
    return true;
  }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * مقدار جدیدی به جدول اضافه می‌کنیم
 * 
 * @param {string} sheetName اسم شیتی که داخلش می‌گردیم
 * @param {string} keyName نام کلید مناسب
 * @param {string} keyValue مقدار کلید در دسترس
 * @param {string} xTitle نام ستون مدنظر برای مقداردهی
 * @param {string} xValue مقدار ستون مدنظر برای پر کردن
 * @return {object}
 */
function setValueHavingKey(sheetName, keyName, keyValue, xTitle, xValue){
  var flag = false;

  var spreadSheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spreadSheet.getSheetByName(sheetName);
  var data = sheet.getDataRange().getValues();

  var xColumn = -1, keyColumn = -1;
  for (var i = 0; i < data[0].length; i++){
    if(data[0][i] == xTitle)
      xColumn = i;
    if(data[0][i] == keyName)
      keyColumn = i;
  }

  var targetRow = -1;
  for (var i = 0; i < data.length; i++) { 
    if(data[i][keyColumn] == keyValue){
      targetRow = i;
      break;
    }
  }

  if(xColumn >= 0 && targetRow >= 0){
    var cell = sheet.getRange(targetRow+1, xColumn+1);
    cell.setValue(xValue);
    flag = true;
  }
  return flag;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * چک کردن ورود کاربر
 */
function loggedIn(userID){
  var row = getRowByKey("PEOPLE", "telegram_id", userID);
  if(row)
    return true;
  return false;
}

/**
 * تایید و ثبت ورود معلم
 */
function registerTeacher(telegram_id, melli_code){
  var spreadSheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spreadSheet.getSheetByName("PEOPLE");

  var row = getRowByKey("TEACHERS", "telegram_id", telegram_id);
  var pass = row["melli_code"];

  if(pass == melli_code){
    sheet.appendRow([telegram_id, row["phone_number"], new Date()]);
    return true;
  }
  return false;
}

/**
 * ذخیره‌ی اطلاعات معلم قبل از خروج
 */
function archiveDeleted(telegram_id){
  var spreadSheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spreadSheet.getSheetByName("DELETED");
  var row = getRowByKey("PEOPLE", "telegram_id", telegram_id);
  sheet.appendRow([telegram_id, row["phone_number"], row["logged_in"], new Date()]);
  return true;
}

/**
 * اطلاعات کلی معلم را برمی‌گرداند
 */
function getTeacherInfo(telegram_id){
  var row = getRowByKey("TEACHERS", "telegram_id", telegram_id);
  var info = row["first_name"] + " " + row["last_name"] + "\n" +
              "دبیر " + row["field"] + "\n" +
              "کد ملی " + row["melli_code"] + "\n"+
              "مدرک " + row["degree"] + "\n";

  if(row["last_field"])
    info += "آخرین رشته‌ی تحصیلی " + row["last_field"] + "\n";
  else
    info += "آخرین رشته‌ی تحصیلی مشخص نشده است (/field)" + "\n";

  if(!row["has_photo"])
    info += "عکس پرسنلی ندارید (/photo)" + "\n";

  if(row["bank_account"])
    info += "شماره حساب ملی " + row["bank_account"] + "\n";
  else
    info += "شماره حساب بانک ملی وارد نشده است (/bank)" + "\n";
    
  if(!row["course_syllabus"])
    info += "طرح درس ارسال نشده است (/syllabus)";
  return info;
}

/**
 * حقوق معلم را برمی‌گرداند
 */
function getTeacherSalary(telegram_id){
  var row = getRowByKey("TEACHERS", "telegram_id", telegram_id);
  var salary = "تدریس جلسه‌ای حلی۵: " + row["session_fee5"] + "\n" +
              "تدریس جلسه‌ای حلی۸: " + row["session_fee8"];
  return salary;
}

/**
 * کاربر را از لیست خارج می‌کند
 */
function logout(telegram_id){
  var flag = false;

  if(loggedIn(telegram_id)){
    // setState(telegram_id, "SELECT_TYPE"); // TODO: change it

    archiveDeleted(telegram_id);
    deleteRowHavingKey("PEOPLE", "telegram_id", telegram_id);

    setValueHavingKey("TEACHERS", "telegram_id", telegram_id, "telegram_id", "");
    flag = true;
  }
  return flag;  
}