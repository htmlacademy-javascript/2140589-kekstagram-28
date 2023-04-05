import {showBigPicture} from './big-picture.js';
import {createTempletPhotos} from './photo-templet.js';

let pictures = [];

const picturesContainer = document.querySelector('.pictures');

// Эта функция принимает результаты других функций и выводит их на страницу: отрисовывает миниаюты,
// открывает большую фотографию,
// добавляет и удаляет комментарии.
const onPicturesContainerClick = (evt) => {
  // этот  метод передает ссылку на родительский элемент picture.
  const thumbnail = evt.target.closest('.picture');

  if (!thumbnail) {
    return;
  }

  // функция возращает значение переданной фотографии по дата атребуту (уникальному id),
  // что бы передать(найти?) массив конкретного элемента (в данном случае фотографии).
  // Т.е возвращает только тот элемент, который подходит под переданные значения.

  const picture = pictures.find(
    (item) => item.id === Number(thumbnail.dataset.userElementId));

  showBigPicture(picture);
};

const renderGallery = function (currentPictures) {
  pictures = currentPictures;

  createTempletPhotos(currentPictures, picturesContainer);

  picturesContainer.addEventListener('click', onPicturesContainerClick);
};

export {renderGallery};
