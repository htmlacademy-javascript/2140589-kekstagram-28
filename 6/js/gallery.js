import {showBigPicture} from './big-picture.js';
import {createTempletPhotos} from './photo-templet.js';
import {newPhotos} from './data.js';
import {createTempletComments} from './user-comments.js';

const container = document.querySelector('.pictures');

const renderGallery = () => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('.picture');
    if (!thumbnail) {
      return;
    }
    const picture = newPhotos.find(
      (item) => item.id === Number(thumbnail.dataset.userElementId)
    );
    showBigPicture(picture);
    createTempletComments(picture.comments);
  });
  createTempletPhotos(newPhotos);
};

export {renderGallery};
