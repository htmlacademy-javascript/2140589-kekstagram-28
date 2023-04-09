import {showBigPicture} from './big-picture.js';
import {createTemplatePhotos} from './miniatures.js';

let pictures = [];
const picturesContainerElement = document.querySelector('.pictures');

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
  createTemplatePhotos(currentPictures, picturesContainerElement);
  picturesContainerElement.addEventListener('click', onPicturesContainerClick);
};

export {renderGallery};
