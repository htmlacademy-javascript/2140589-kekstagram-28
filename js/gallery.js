import {showBigPicture} from './big-picture.js';
import {createTempletPhotos} from './photo-templet.js';
import {newPhotos} from './data.js';

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
  });

  createTempletPhotos(newPhotos);
};

export {renderGallery};
