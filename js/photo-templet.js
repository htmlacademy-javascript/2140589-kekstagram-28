import { createSimilarPhoto } from './main.js';

const similarListElement = document.querySelector('.pictures');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarListFragment = document.createDocumentFragment();

const createTempletPhotos = function () {
  createSimilarPhoto.forEach(({url, likes, comments}) => {
    const userElement = similarPhotoTemplate.cloneNode(true);

    userElement.querySelector('.picture__img').src = url;
    userElement.querySelector('.picture__comments').textContent = comments.length;
    userElement.querySelector('.picture__likes').textContent = likes;

    similarListFragment.appendChild(userElement);

    similarListElement.appendChild(similarListFragment);
  });
};

export {createTempletPhotos};
