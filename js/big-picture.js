import {isEscapeKey} from './utils.js';
import { showComments, resetCommentsShown } from './user-comments.js';

const bigPicture = document.querySelector('.big-picture');

//Эта функция принимает значения массива и записывеает эти значения в элементы.
const fillBigPicture = ({url, description, likes}) => {
  //заполняет значением массива путь к картинке ( в src).
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  //Заполняет значением массива текстовое содержание массива.
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
};

const userModalCloseElement = bigPicture.querySelector('.big-picture__cancel');

const body = document.querySelector('body');

// Эта функция позволяет закрывать модальное окно (большую фотографию) на клавищу escape.
const onDocumentEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

// Эта функция закрытия модального окна. Она добавляет класс hidden в разметку(закрывает большую картинку),
//стирает комментарии, убирает скролл с окна.
function closeUserModal () {
  // эта функция добавляет класс в разметку.
  bigPicture.classList.add('hidden');
  // эта функция убирает класс из разметки.
  body.classList.remove('modal-open');
  // Эта функция обновляет значение счеткича комментариев.
  resetCommentsShown();
}

//Добавляет обработчик события по клику на закрытие окна.
userModalCloseElement.addEventListener('click', closeUserModal);

//Эта функция открывает большую картинку, убирая класс hidden, прнимает значения других функций и
//передает их в функцию которая выводит все на страницу.
const showBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  //Добавляет скролл.
  body.classList.add('modal-open');
  // добавляет обработчик собития через функцию клика на клавишу escape.
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  //эта функция принимает значения массива и заполняет данные элементов.
  fillBigPicture(photo);
  // Этот код заполняет(в данном случае чистит), элементы разметки (комментраии), добавленные ранее.
  bigPicture.querySelector('.social__comments').innerHTML = '';
  // Эта функция принимает данные массива из объекта, отрисовывает 5 комментариев на странице,
  // по клику на "загурзить еще" отрисовывает еще 5.
  showComments(photo.comments);
};

export {showBigPicture};
