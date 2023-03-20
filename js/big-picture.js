import { createPhotosComments } from './data.js';
import {isEscapeKey, isEnterKey} from './utils.js';
import {createTempletComments} from './user-comments.js';
const bigPicture = document.querySelector('.big-picture');
import {newPhotos} from './data.js';


const fillBigPicture = ({url, description, likes, comments}) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
};

const userModalCloseElement = bigPicture.querySelector('.big-picture__cancel');

const body = document.querySelector('body');
const commentsCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const onDocumentEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};


function closeUserModal () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
}

userModalCloseElement.addEventListener('click', () => closeUserModal ());

const showBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  fillBigPicture(photo);
  // createTempletComments(photo);
  // commentsCounter.classList.add('hidden');
  // commentsLoader.classList.add('hidden');
  console.log(photo);
};

export {showBigPicture};
