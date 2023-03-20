import {createTempletPhotos} from './photo-templet.js';
import {newPhotos} from './data.js';
import {isEscapeKey, isEnterKey} from './utils.js';

const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureImg = bigPictureBlock.querySelector('.big-picture__img').querySelector('img');
const countLikes = bigPictureBlock.querySelector('.likes-count');
const countComments = bigPictureBlock.querySelector('.comments-count');
const socialComments = bigPictureBlock.querySelector('.social__comments');
const socialComment = bigPictureBlock.querySelector('.social__comment');
const socialCaption = bigPictureBlock.querySelector('.social__caption');
const commentsLoader = document.querySelector('.comments-loader');
const userModalOpenElement = document.querySelector('.pictures');
const userModalCloseElement = bigPictureBlock.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const clearModal = () => {
  bigPictureBlock.innerHTML = '';
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const getPhoto = function (bigphoto) {
  bigphoto.forEach(({url, likes, comments, description}) => {
    bigPictureImg.src = url;
    countLikes.textContent = likes;
    countComments.textContent = comments.length;
    socialCaption.textContent = description;
  });
};

function openUserModal () {
  bigPictureBlock.classList.remove('hidden');
  // createTempletPhotos();
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  getPhoto(newPhotos);
}

function closeUserModal () {
  bigPictureBlock.classList.add('hidden');
  // clearModal();
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

userModalOpenElement.addEventListener('click', () => {
  openUserModal();
});

userModalOpenElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    openUserModal();
  }
});

userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});

userModalCloseElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeUserModal();
  }
});


const container = document.querySelector('.pictures');
const renderBigPicture = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thunbnail = evt.target.closest('[data-user-element-id]');
    if (!thunbnail) {
      return;
    }

    const picture = createTempletPhotos.find((item) => item.id === Number(thunbnail.dataset.userElementId)
    );

    console.log(pictures);

    openUserModal(picture);

    createTempletPhotos();
  });
};



// const renderBigPicture = function (bigphoto) {
//   bigphoto.forEach(({url, likes, comments, description}) => {
//     bigPictureImg.src = url;
//     countLikes.textContent = likes;
//     countComments.textContent = comments.length;
//     socialCaption.textContent = description;
//   });
// };


export {renderBigPicture};


