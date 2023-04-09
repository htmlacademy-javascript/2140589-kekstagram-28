import {isEscapeKey} from './utils.js';
import { resetScale, setScale } from './scale.js';
import {resetEffects} from './effects.js';
import {sendData} from './api.js';
import {openMessage} from './messages.js';

const body = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const formModalElement = document.querySelector('.img-upload__overlay');
const uploadFileElement = document.querySelector('#upload-file');
const uploadCancelButtonElement = document.querySelector('.img-upload__cancel');
const textHashtagElement = document.querySelector('.text__hashtags');
const textDescriptionElement = document.querySelector('.text__description');
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_LENGTH = 5;
const HASHTAG_ERROR = 'Недопустимое значение хэштега';
const submitButtonElement = document.querySelector('#upload-submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const pristine = new Pristine (formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isTextFieldFocused = () =>
  document.activeElement === textHashtagElement ||
  document.activeElement === textDescriptionElement;

const closeUserModal = () => {
  formElement.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  formModalElement.classList.add('hidden');
  body.classList.remove('modal-open');
};

const onDocumentEscapeKeydown = (evt) => {
  const errorModal = document.querySelector('.error');
  if (isEscapeKey(evt) && !isTextFieldFocused() && !errorModal) {
    evt.preventDefault();
    closeUserModal();
    document.removeEventListener('keydown', onDocumentEscapeKeydown);
  }
};

const isValidTag = (tag) => VALID_HASHTAG.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_LENGTH;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  textHashtagElement,
  validateTags,
  HASHTAG_ERROR
);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const setUserFormSubmit = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const valid = pristine.validate();

    if (valid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(openMessage)
        .catch(
          (err) => {
            openMessage(err);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

const showFormModal = () => {
  setScale();
  formModalElement.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  uploadCancelButtonElement.addEventListener('click', closeUserModal);
};

const clickOnUpload = () => {
  uploadFileElement.addEventListener('change', showFormModal);
};

export {clickOnUpload, setUserFormSubmit, closeUserModal };
