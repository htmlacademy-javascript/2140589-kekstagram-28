import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const closeMessage = () => {
  body.lastChild.remove();
};

const onDocumentEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    body.lastChild.remove();

    document.removeEventListener('click', onDocumentEscapeKeydown);
  }
};

const onOutsideClick = function (evt) {
  if (evt.target === body.lastChild) {
    body.lastChild.remove();

    document.removeEventListener('click', onOutsideClick);
  }
};

const openMessage = (message) => {
  const successMessage = successTemplate.cloneNode(true);
  const errorMessage = errorTemplate.cloneNode(true);
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  document.addEventListener('click', onOutsideClick);

  if (message) {
    body.append(errorMessage);

    const errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', closeMessage);

    return message;

  } else {
    body.append(successMessage);

    const successButton = document.querySelector('.success__button');
    successButton.addEventListener('click', closeMessage);

    return message;
  }
};

export {openMessage};
