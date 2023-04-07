import {isEscapeKey} from './utils.js';
import { showComments, resetCommentsShown } from './user-comments.js';

const bigPicture = document.querySelector('.big-picture');
const userModalCloseElement = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const fillBigPicture = ({url, description, likes}) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
};

const closeUserModal = () => {
  bigPicture.classList.add('hidden');
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
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  fillBigPicture(photo);
  bigPicture.querySelector('.social__comments').innerHTML = '';
  showComments(photo.comments);
};

export {showBigPicture};
