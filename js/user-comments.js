const commentsList = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const commentsListFragment = document.createDocumentFragment();
let commentsShown = 0;
const EXTRA_COMMENTS = 5;
const commentsCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
//сюда мы выводим  выведенные комментариев из функции showComments.
let savedComments = [];

// эта функциия прнимает массив комментариев, добавляет полученную информацию в элементы дом дерева,
// передает полученные комментарии в функцию, которая их отрисовывает.
const createTempletComments = function (comments) {
  // этот метод перебирает элементы массива, и позволяет выполнить функцию. В этом случае записать
  // данные массива в разметку комментариев.
  comments.forEach(({avatar, message, name}) => {
    // клонирует и возвращает дуплекат элемента.
    const userComment = socialComment.cloneNode(true);

    userComment.querySelector('.social__picture').src = avatar;
    userComment.querySelector('.social__picture').alt = name;
    userComment.querySelector('.social__text').textContent = message;

    // заполняет фрагмент новыми данными.
    commentsListFragment.appendChild(userComment);
  });

  // выводит полученный фрагмент в дом-элемент.
  commentsList.appendChild(commentsListFragment);
};

// Эта функция принимает массив комментариев. Добавляет данные в счетчик. Убирает/добавляет кнопку загурзить еще.
// отрисовывает комментарии на странице (передает количество отрисованных комментов).
const showComments = function (comments) {
  savedComments = comments;

  // сверяет длинну массива и количесвто отрисованных комментариев. Если на странице показанных комментариев меньше, чем длина массива,
  // то оставляет кнопку загрузки. Если нет, то убирает кнопку.
  if (comments.length > commentsShown + EXTRA_COMMENTS) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }

  //эта функция передает комментарии, а метод возвращает их копию и складывает в зависимости от длины показанных комментариев
  // до полученной длины после загрузки новых комментариев на каждой итерации.
  createTempletComments(comments.slice(commentsShown, EXTRA_COMMENTS + commentsShown));

  // этот код передает значение длины показанных комментариев и длину массива (то есть все комментарии к фотографии).
  commentsCounter.innerHTML = `${comments.length < commentsShown + EXTRA_COMMENTS ? comments.length : commentsShown + EXTRA_COMMENTS} из <span class="comments-count">${comments.length}</span> комментариев`;
};

//Эта функция прибавляет 5 комментаривев к текущему колличесвту комментариев на каждой итерации.
const clickOnLoader = function () {
  // на каждой итерации к количевту показанных комментариев прибавляется 5 комментариев.
  commentsShown += EXTRA_COMMENTS;
  // выводит через параметр сохраненные комментарии (5-10-15-20 и тд)
  showComments(savedComments);
};

// Эта функция обнуляет колиесвто комментариев.
const resetCommentsShown = function() {
  commentsShown = 0;
};

//добавляет обработчик событий на кнопку загурзить еще.
commentsLoader.addEventListener('click', clickOnLoader);

export {showComments, resetCommentsShown};
