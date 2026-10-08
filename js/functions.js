//Функция для проверки длины строки (Вариант 1):

function checkStringLenght (stringToValidate, maxLenght) {
  return stringToValidate.length <= maxLenght;
}


//Функция для проверки длины строки (Вариант 2):

const validateStringLength = (validateString, maxStringLenght) => validateString.length <= maxStringLenght;

//Функция проверяющая, является ли строка палиндромом:

function isPalindrom (str) {
  const cleaned = str.replaceAll(' ', '').toLowerCase();
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}


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


