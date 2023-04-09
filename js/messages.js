import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');

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

const onOutsideClick = (evt) => {
  if (evt.target === body.lastChild) {
    body.lastChild.remove();

    document.removeEventListener('click', onOutsideClick);
  }
};

const openMessage = (message) => {
  const successMessage = successTemplateElement.cloneNode(true);
  const errorMessage = errorTemplateElement.cloneNode(true);
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
