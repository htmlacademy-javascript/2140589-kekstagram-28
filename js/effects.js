const EFFECTS = [
  { //первым элементом записаны настройки оригинала.
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },

  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },

  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },

  {
    name: 'heat',
    style: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS[0]; // первый элемент в массиве effects.
let chosenEffect = DEFAULT_EFFECT; // сюда записывается выбранных элемент массива.

const imageElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelElement = document.querySelector('.effect-level__value');

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

// эта функция показывает слайдер, когда есть эффекты.
const showSlider = function () {
  sliderContainerElement.classList.remove('hidden');
};

// эта функция прячет слайдер, если он не нужен (когда нет эффектов).
const hideSlider = function () {
  sliderContainerElement.classList.add('hidden');
};

// эта функция передает слайдеру обновленные настройки того эффекта, что выбран.
const updateSlider = function () {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },

    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  // проверяет выбран ли эффект оргинальный, в зависимости от этого прячет или показывает слайдер.
  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

//  эта функция проверяет, что клик произошел по одному из эффектов.
const onEffectsChange = function (evt) {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);// ищет в массиве тот элемент, на который был клик и записывается в переменную, которая принимает значение еффекта.
  imageElement.classList = `effects__preview--${chosenEffect.name}`; // перезаписывает класс элемента с учетом найденного значения.
  updateSlider();
};

// эта функция получает значения слайдера,и перезаписывает их.
const onSliderUpdate = function () {
  const sliderValue = sliderElement.noUiSlider.get(); // получает значение слайдера.

  // проверяет какой эффект выбран. Записывает в него значения из объектов.
  if (isDefault()) {
    imageElement.style.filter = DEFAULT_EFFECT.style; // если выбран эффект оригинал, записывать дефолтный стиль.
  } else {
    imageElement.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`; // зааписывает стиль эффекта, подставляет значения из слайдера(если есть).
  }

  effectLevelElement.value = sliderValue; // записывается значения слайдера в скрытой поле.
};

// эта функция перезаписывает эффект в начальные настройки, либо в обновленные настройки.
const resetEffects = function () {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

// создается слайдер. Передается элемент которому нужно создать слайдер и объект с настройками.
noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },

  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

hideSlider();

effectsElement.addEventListener('change', onEffectsChange); // срабатывает при смене эффекта.
sliderElement.noUiSlider.on('update', onSliderUpdate); // срабатывает при изменении слайдера.

export { resetEffects };
