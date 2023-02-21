const checkString = (testString, length) => {
  if(testString.length <= length) {
    return true;
  }

  return false;
};

const testPalindrom = (string) => {
  const temtString = string.toLowerCase().replaceAll(' ', '');
  let reverseString = '';
  for (let i = temtString.length - 1; i >= 0; i--) {
    reverseString += temtString.at(i);
  }
  if (temtString === reverseString) {
    return true;
  }

  return false;
};

const getNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }
  let newNumber = '';
  for (let i = 0; i < string.length; i++) {
    let currentSymbol = parseInt(string.at(i), 10);
    if (!isNaN(currentSymbol)) {
      newNumber += currentSymbol;
    }
  }

  return parseInt(newNumber, 10);
};

const myPadStart = (string, minLenght, pad) => {
  let result = string;
  while (result.length < minLenght) {
    const newResultLenght = result.length + pad.length;
    const actualPad = newResultLenght <= minLenght ? pad : pad.slice(0, minLenght - newResultLenght);
    result = actualPad + result;
  }
  return result;
};
