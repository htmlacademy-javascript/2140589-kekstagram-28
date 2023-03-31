import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessage = successTemplate.cloneNode(true);
const errorMessage = errorTemplate.cloneNode(true);


const closeSuccessMessage = () => {
  successMessage.remove();
};

const closeErrorMessage = () => {
  errorMessage.remove();
};

const onDocumentEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
    closeErrorMessage();
  }
};

const onOutsideClick = () => {
  closeSuccessMessage();
  closeErrorMessage();
};


const openSuccessMessage = function () {
  body.append(successMessage);

  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', closeSuccessMessage);

  document.addEventListener('keydown', onDocumentEscapeKeydown);
  document.addEventListener('click', onOutsideClick);
};

const openErrorMessage = function () {
  body.append(errorMessage);

  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', closeErrorMessage);

  document.addEventListener('keydown', onDocumentEscapeKeydown);
  document.addEventListener('click', onOutsideClick);
};

export {openSuccessMessage, openErrorMessage};
