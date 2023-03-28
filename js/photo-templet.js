const similarListElement = document.querySelector('.pictures');
// находит шаблон по id.
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
// эта функция, которая клонирует дом дерево.
const similarListFragment = document.createDocumentFragment();

// Эта функция прнимает значения объекта и передает миниатюры на странице.
const createTempletPhotos = function (photos) {
  // Этот метод перебирает каждый элемент масива и позволяет
  // выполнить функцию (в данном случае записать значения массива в элементы на странице).
  photos.forEach(({url, likes, comments, description, id}) => {
    // копирует и возвращает дупликат элемента.
    const userElement = similarPhotoTemplate.cloneNode(true);

    //заполняет элементы по найденному классу новыми данными из массива.
    userElement.querySelector('.picture__img').src = url; // заполняет путь к картинке.
    userElement.querySelector('.picture__img').alt = description; //заполняет скрытое описание фотографии.
    userElement.querySelector('.picture__likes').textContent = likes; //заполняет полученные данные текстом.
    userElement.querySelector('.picture__comments').textContent = comments.length; // выводит длину массива комментов.
    userElement.dataset.userElementId = id;

    //Эта часть кода добавляет во фрагмент полученный резульат записи массива в элементы
    similarListFragment.appendChild(userElement);

    //Эта чать когда добавляет полученные дочерние эллементы в родительский элемент.
    similarListElement.appendChild(similarListFragment);
  });
};

export {createTempletPhotos};
