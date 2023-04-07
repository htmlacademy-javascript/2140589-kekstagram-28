const commentsList = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const commentsListFragment = document.createDocumentFragment();
let commentsShown = 0;
const EXTRA_COMMENTS = 5;
const commentsCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
let savedComments = [];

const createTempletComments = (comments) => {
  comments.forEach(({ avatar, message, name }) => {
    const userComment = socialComment.cloneNode(true);

    userComment.querySelector('.social__picture').src = avatar;
    userComment.querySelector('.social__picture').alt = name;
    userComment.querySelector('.social__text').textContent = message;

    commentsListFragment.appendChild(userComment);
  });

  commentsList.appendChild(commentsListFragment);
};

const showComments = (comments) => {
  savedComments = comments;

  if (comments.length > commentsShown + EXTRA_COMMENTS) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }

  createTempletComments(comments.slice(commentsShown, EXTRA_COMMENTS + commentsShown));

  commentsCounter.innerHTML = `${comments.length < commentsShown + EXTRA_COMMENTS ? comments.length : commentsShown + EXTRA_COMMENTS} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const clickOnLoader = () => {
  commentsShown += EXTRA_COMMENTS;
  showComments(savedComments);
};

const resetCommentsShown = () => {
  commentsShown = 0;
};

commentsLoader.addEventListener('click', clickOnLoader);

export {showComments, resetCommentsShown};
