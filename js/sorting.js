const MAX_PICTURES = 10;
const Sorter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterElement = document.querySelector('.img-filters');

let currentSorting = Sorter.DEFAULT;

let pictures = [];

const sortRandomly = function () {
  return Math.random() - 0.5;
};

const sortByComments = function (pictureA, pictureB) {
  return pictureB.comments.length - pictureA.comments.length;
};

const getSortedPictures = function () {
  switch(currentSorting) {
    case Sorter.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, MAX_PICTURES);

    case Sorter.DISCUSSED:
      return [...pictures].sort(sortByComments);

    default:
      return [...pictures];
  }
};

const setOnFilterClick = function (callback) {
  filterElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentSorting) {
      return;
    }

    filterElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');

    clickedButton.classList.add('img-filters__button--active');

    currentSorting = clickedButton.id;

    callback(getSortedPictures());
  });
};

const init = function (loadedPictures, callback) {
  filterElement.classList.remove('img-filters--inactive');

  pictures = [...loadedPictures];

  setOnFilterClick(callback);
};


export {init, getSortedPictures};
