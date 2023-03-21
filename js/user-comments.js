const commentsList = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const commentsListFragment = document.createDocumentFragment();

const createTempletComments = function (comments) {
  commentsList.innerHTML = '';
  
  comments.forEach(({avatar, message, name}) => {
    const userComment = socialComment.cloneNode(true);

    userComment.querySelector('.social__picture').src = avatar;
    userComment.querySelector('.social__picture').alt = name;
    userComment.querySelector('.social__text').textContent = message;

    commentsListFragment.appendChild(userComment);


  });

  commentsList.appendChild(commentsListFragment);
};

export {createTempletComments};
