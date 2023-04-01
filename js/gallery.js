import {showBigPicture} from './big-picture.js';
import {createTempletPhotos} from './photo-templet.js';

const container = document.querySelector('.pictures');

// Эта функция принимает результаты других функций и выводит их на страницу: отрисовывает миниаюты,
// открывает большую фотографию,
// добавляет и удаляет комментарии.
const renderGallery = (newPhotos) => {
  container.addEventListener('click', (evt) => {
    // этот  метод передает ссылку на родительский элемент picture.
    const thumbnail = evt.target.closest('.picture');

    if (!thumbnail) {
      return;
    }

    // функция возращает значение переданной фотографии по дата атребуту (уникальному id),
    // что бы передать(найти?) массив конкретного элемента (в данном случае фотографии).
    // Т.е возвращает только тот элемент, который подходит под переданные значения.

    const picture = newPhotos.find(
      (item) => item.id === Number(thumbnail.dataset.userElementId));

    showBigPicture(picture);
  });

  createTempletPhotos(newPhotos);
};

export {renderGallery};
