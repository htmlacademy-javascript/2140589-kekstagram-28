const isLessOrEqual = (testString, length) => testString.length <= length;

isLessOrEqual('проверяемая строка', 20);


const isPalindrom = (string) => {
  const temtString = string.toLowerCase().replaceAll(' ', '');
  const reverseString = temtString.split('').reverse().join('');

  return temtString === reverseString;
};

isPalindrom('Лёша на полке клопа нашёл ');


const getNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }

  let newNumber = '';

  for (let i = 0; i < string.length; i++) {
    const currentSymbol = parseInt(string.at(i), 10);

    if (!isNaN(currentSymbol)) {
      newNumber += currentSymbol;
    }
  }

  return parseInt(newNumber, 10);
};

getNumber('1 кефир, 0.5 батона');


const getPad = (string, minLenght, pad) => {
  let result = string;

  while (result.length < minLenght) {
    const newResultLenght = result.length + pad.length;
    const actualPad = newResultLenght <= minLenght ? pad : pad.slice(0, minLenght - newResultLenght);

    result = actualPad + result;
  }

  return result;
};

getPad('qwerty', 4, '0');
