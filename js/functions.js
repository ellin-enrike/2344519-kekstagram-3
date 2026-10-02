//Функция для проверки длины строки (Вариант 1):

function checkStringLenght (stringToValidate, maxLenght) {
  return stringToValidate.length <= maxLenght;
}


//Функция для проверки длины строки (Вариант 2):

const validateStringLength = (validateString, maxStringLenght) => validateString.length <= maxStringLenght;


//Функция для проверки, является ли строка палиндромом:

function isPalindrom (str) {
  const cleaned = str.replaceAll(' ', '').toLowerCase();
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

//Дополнительная задача на извлечение цифр из строки:

function getDigits(value) {
  const str = value.toString();
  let digits = '';

  for (const char of str) {
    const number = parseInt(char, 10);

    if (!Number.isNaN(number)) {
      digits += char;
    }
  }

  if (digits === '') {
    return NaN;
  }

  return parseInt(digits, 10);
}


