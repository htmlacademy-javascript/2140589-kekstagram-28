import {newUser} from './data.js';

const similarListElement = document.querySelector('.pictures');

const similarUserTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createSimilarUser = newUser();

const similarListFragment = document.createDocumentFragment();

createSimilarUser.forEach(({url, likes, comments}) => {
  const userElement = similarUserTemplate.cloneNode(true);

  userElement.querySelector('.picture__img').src = url;
  userElement.querySelector('.picture__comments').textContent = comments.length;
  userElement.querySelector('.picture__likes').textContent = likes;

  similarListFragment.appendChild(userElement);
});

similarListElement.appendChild(similarListFragment);

export{createSimilarUser};
