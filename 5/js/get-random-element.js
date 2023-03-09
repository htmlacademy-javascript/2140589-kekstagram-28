function getRandomInteger (min, max) {
  const minValue = Math.abs(min);
  const maxValue = Math.abs(max);
  const lower = Math.ceil(Math.min(minValue, maxValue));
  const upper = Math.floor(Math.max(minValue, maxValue));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomInteger};
export {getRandomArrayElement};
