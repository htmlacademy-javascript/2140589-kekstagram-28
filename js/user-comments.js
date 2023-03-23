const commentsList = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const commentsListFragment = document.createDocumentFragment();
let commentsShown = 0;
const extraComments = 5;
const commentsCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
let savedComments = [];

const createTempletComments = function (comments) {
  comments.forEach(({avatar, message, name}) => {
    const userComment = socialComment.cloneNode(true);

    userComment.querySelector('.social__picture').src = avatar;
    userComment.querySelector('.social__picture').alt = name;
    userComment.querySelector('.social__text').textContent = message;

    commentsListFragment.appendChild(userComment);
  });

  commentsList.appendChild(commentsListFragment);
};

const showComments = function (comments) {
  savedComments = comments;

  if (comments.length > commentsShown + extraComments) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }

  createTempletComments(comments.slice(commentsShown, extraComments + commentsShown));

  commentsCounter.innerHTML = `${comments.length < commentsShown + extraComments ? comments.length : commentsShown + extraComments} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const clickOnLoader = function () {
  commentsShown += extraComments;
  showComments(savedComments);
};

const resetCommentsShown = function() {
  commentsShown = 0;
};

commentsLoader.addEventListener('click', clickOnLoader);

export {showComments, resetCommentsShown};
