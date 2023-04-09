const commentsListElement = document.querySelector('.social__comments');
const socialCommentElement = document.querySelector('.social__comment');
const commentsListFragment = document.createDocumentFragment();
const COMMENTS_COUNT_PER_LOAD = 5;
const commentsCounterElement = document.querySelector('.social__comment-count');
const commentsLoaderButtonElement = document.querySelector('.comments-loader');
let savedComments = [];
let commentsShown = 0;

const createTempletComments = (comments) => {
  comments.forEach(({ avatar, message, name }) => {
    const userCommentElement = socialCommentElement.cloneNode(true);

    userCommentElement.querySelector('.social__picture').src = avatar;
    userCommentElement.querySelector('.social__picture').alt = name;
    userCommentElement.querySelector('.social__text').textContent = message;

    commentsListFragment.appendChild(userCommentElement);
  });

  commentsListElement.appendChild(commentsListFragment);
};

const showComments = (comments) => {
  savedComments = comments;

  if (comments.length > commentsShown + COMMENTS_COUNT_PER_LOAD) {
    commentsLoaderButtonElement.classList.remove('hidden');
  } else {
    commentsLoaderButtonElement.classList.add('hidden');
  }

  createTempletComments(comments.slice(commentsShown, COMMENTS_COUNT_PER_LOAD + commentsShown));

  commentsCounterElement.innerHTML = `${comments.length < commentsShown + COMMENTS_COUNT_PER_LOAD ? comments.length : commentsShown + COMMENTS_COUNT_PER_LOAD} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const clickOnLoader = () => {
  commentsShown += COMMENTS_COUNT_PER_LOAD;
  showComments(savedComments);
};

const resetCommentsShown = () => {
  commentsShown = 0;
};

commentsLoaderButtonElement.addEventListener('click', clickOnLoader);

export {showComments, resetCommentsShown};
