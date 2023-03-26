import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const formModal = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const textHashtag = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_LENGTH = 5;
const HASHTAG_ERROR = 'Недопустимое значение хэштега';

// Этот код объявляет пристин.
const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

// добавляет обрабодчик на закрытие модального окна по кнопке.
uploadCancelButton.addEventListener('click', closeUserModal);

//используется что бы проверить лежит ли в документе поле с хэштегом или комментарием.
const isTextFieldFocused = () =>
  document.activeElement === textHashtag ||
  document.activeElement === textDescription;

// эта функция позволяет закрывать окно с клавишы escape.
const onDocumentEscapeKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) { // если не хэштег или комментарий.
    evt.preventDefault();
    closeUserModal();
  }
};


// эта функция добавляет классы для закрытия модального окна.
function closeUserModal () {
  form.reset(); // возращает к стандартным насройкам формы.
  pristine.reset(); // возвращает к стандартным настройкам пристина.
  formModal.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscapeKeydown); //удаляет обрабодчик закрытия окна на клавишу escape.
}

// проверяет соответсвуют ли знаки в хэштеге разрешенным.
const isValidTag = (tag) => VALID_HASHTAG.test(tag);

// проверяет колличесвто хэштегов.
const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_LENGTH;

// функция проверят что бы не было одинаковых хэштегов.
const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

// это функция валидации хэщтега. Она принимает параметр, который ей передает пристин и сравнивает значения.
const validateTags = (value) => {
  const tags = value
    .trim() // удаляет лишни пробелы в начале и в конце строки.
    .split(' ') // добалвяет пробел между хэштегами.
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

// добавляет валидатор хэштега.
pristine.addValidator(
  textHashtag,
  validateTags,
  HASHTAG_ERROR
);

// Эта функция нужна для того, что бы блокировать или разрешать отправку формы.(кнопку отключаетесли что-то не так).
const onFormSubmit = (evt) => {
  const valid = pristine.validate();
  //этот условие выполняет дейстие если все данные введены верно, блокирует кнопку если нет.
  if (valid) {
    form.submit();
  }
  evt.preventDefault();
};

// Эта функция открывает модальное окно, добавляет скрол на страницу, добавляет возможнсоть закрывать старницу по escape.
const showFormModal = () => {
  formModal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscapeKeydown);
};

form.addEventListener('submit', onFormSubmit);

// Этот код делает так, что бы модальное окно открывалось не по клику, а после добавления фото на страницу.
const clickOnUpload = function () {
  uploadFile.addEventListener('change', showFormModal);
};

export {clickOnUpload};
