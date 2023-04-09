import {isEscapeKey} from './utils.js';
import { showComments, resetCommentsShown } from './user-comments.js';

const bigPictureElement = document.querySelector('.big-picture');
const userModalCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const fillBigPicture = ({url, description, likes}) => {
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
};

const closeUserModal = () => {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  resetCommentsShown();
};

const onDocumentEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
    document.removeEventListener('click', onDocumentEscapeKeydown);
  }
};

userModalCloseElement.addEventListener('click', closeUserModal);

const showBigPicture = (photo) => {
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  fillBigPicture(photo);
  bigPictureElement.querySelector('.social__comments').innerHTML = '';
  showComments(photo.comments);
};

export {showBigPicture};
