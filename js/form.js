import {isEscapeKey} from './utils.js';
import { resetScale, setScale } from './scale.js';
import {resetEffects} from './effects.js';
import {sendData} from './api.js';
import {openMessage} from './messages.js';

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
const submitButton = document.querySelector('#upload-submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isTextFieldFocused = () =>
  document.activeElement === textHashtag ||
  document.activeElement === textDescription;

const closeUserModal = () => {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  formModal.classList.add('hidden');
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
  textHashtag,
  validateTags,
  HASHTAG_ERROR
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
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
  formModal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  uploadCancelButton.addEventListener('click', closeUserModal);
};

const clickOnUpload = () => {
  uploadFile.addEventListener('change', showFormModal);
};

export {clickOnUpload, setUserFormSubmit, closeUserModal };
