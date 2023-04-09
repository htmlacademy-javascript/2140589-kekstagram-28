const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleControlValueElement.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleControlValueElement.value, 10);
  let newValue = currentValue - SCALE_STEP;

  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }

  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleControlValueElement.value, 10);
  let newValue = currentValue + SCALE_STEP;

  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }

  scaleImage(newValue);
};


const resetScale = () => scaleImage(DEFAULT_SCALE);

const setScale = () => scaleImage(DEFAULT_SCALE);

smallerButtonElement.addEventListener('click', onSmallerButtonClick);

biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export {resetScale , setScale};
