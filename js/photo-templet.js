const similarListElement = document.querySelector('.pictures');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarListFragment = document.createDocumentFragment();

const createTempletPhotos = (photos, picturesContainer) => {
  picturesContainer.querySelectorAll('.picture').forEach((element) => element.remove());

  photos.forEach(({url, likes, comments, description, id}) => {
    const userElement = similarPhotoTemplate.cloneNode(true);

    userElement.querySelector('.picture__img').src = url;
    userElement.querySelector('.picture__img').alt = description;
    userElement.querySelector('.picture__likes').textContent = likes;
    userElement.querySelector('.picture__comments').textContent = comments.length;
    userElement.dataset.userElementId = id;

    similarListFragment.appendChild(userElement);

    similarListElement.appendChild(similarListFragment);
  });
};

export {createTempletPhotos};
