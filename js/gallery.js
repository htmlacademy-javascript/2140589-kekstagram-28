import {showBigPicture} from './big-picture.js';
import {createTempletPhotos} from './photo-templet.js';

let pictures = [];
const picturesContainer = document.querySelector('.pictures');

const onPicturesContainerClick = (evt) => {
  const thumbnail = evt.target.closest('.picture');

  if (!thumbnail) {
    return;
  }

  const picture = pictures.find(
    (item) => item.id === Number(thumbnail.dataset.userElementId));

  showBigPicture(picture);
};

const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  createTempletPhotos(currentPictures, picturesContainer);
  picturesContainer.addEventListener('click', onPicturesContainerClick);
};

export {renderGallery};
