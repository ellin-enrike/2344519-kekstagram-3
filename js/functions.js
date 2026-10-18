//Функция для проверки длины строки (Вариант 1):

function checkStringLength (stringToValidate, maxLength) {
  return stringToValidate.length <= maxLength;
}

checkStringLength('Привет', 10);


//Функция для проверки длины строки (Вариант 2):
const validateStringLength = (validateString, maxStringLength) => validateString.length <= maxStringLength;

validateStringLength('Привет', 10);


//Функция проверрки строки на палиндром:
function isPalindrom (str) {
  const cleaned = str.replaceAll(' ', '').toLowerCase();
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

isPalindrom('abba');


// Дополнительная задача - извлечение цифр из строки:

function getDigits(value) {
  const str = value.toString();
  let digits = '';

  for (const char of str) {

    if (char >= '0' && char <= '9') {
      digits += char;
    }
  }

  if (digits === '') {
    return 0;
  }
  return parseInt(digits, 10);
}

getDigits(7);

// Задача "Делу время"

function isMeetingInWorkday(startWork, endWork, startMeeting, durationMinutes) {

  function timeToMinutes(timeStr) {
    const normalized = timeStr.replace('.', ':');
    const [hoursStr, minutesStr] = normalized.split(':');

    const hours = Number(hoursStr);
    const minutes = Number(minutesStr || 0);

    return hours * 60 + minutes;
  }

  const workStartMinutes = timeToMinutes(startWork);
  const workEndMinutes = timeToMinutes(endWork);
  const meetingStartMinutes = timeToMinutes(startMeeting);
  const meetingEndMinutes = meetingStartMinutes + durationMinutes;

  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
}

export {isMeetingInWorkday};

