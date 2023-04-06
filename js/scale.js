const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

// эта функция получает значение поля при уменьшее или увеличении маштаба фотографии.
const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`; //подставляет код к css правилам.
  scaleControlValue.value = `${value}%`; //прибавляет % в пол форме.
};

// Эта функция передает новое значения поля ввода при - значения. (отнимает 25)
const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);

  let newValue = currentValue - SCALE_STEP;
  // проверяет, что бы нижняя граница уменьшения маштаба не была меньше 25%.
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }

  scaleImage(newValue);
};

// / Эта функция передает новое значения поля ввода при + значения. (прибавляет 25)
const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);

  let newValue = currentValue + SCALE_STEP;
  //проверяет, что бы верхния граница увеличения маштаба не была больше 100%.
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }

  scaleImage(newValue);
};


const resetScale = () => scaleImage(DEFAULT_SCALE);
// Эти функции передают маштаб по умолчанию в значение поля.
const setScale = () => scaleImage(DEFAULT_SCALE);

smallerButtonElement.addEventListener('click', onSmallerButtonClick);

biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export {resetScale , setScale};
