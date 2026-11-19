import { isEscapeKey } from './utils.js';

const COMMENTS_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentLoaderElement = bigPictureElement.querySelector('.comments-loader');
const shownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const totalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const captionElement = bigPictureElement.querySelector('.social__caption');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const bodyElement = document.body;

let currentComments;
let shownCommentsCount = 0;

const renderNextComments = () => {
  const nextComments = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_STEP);
  shownCommentsCount += nextComments.length;

  const fragment = document.createDocumentFragment();

  nextComments.forEach((comment) => {
    const li = document.createElement('li');
    li.className = 'social__comment';

    const img = document.createElement('img');
    img.className = 'social__picture';
    img.width = 35;
    img.height = 35;
    img.src = comment.avatar;
    img.alt = comment.name;

    const p = document.createElement('p');
    p.className = 'social__text';
    p.textContent = comment.message;

    li.appendChild(img);
    li.appendChild(p);
    fragment.appendChild(li);
  });

  commentsListElement.appendChild(fragment);
  shownCountElement.textContent = shownCommentsCount;

  if (shownCommentsCount >= currentComments.length) {

    commentLoaderElement.classList.add('hidden');
  }
};

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
}

const onCloseButtonClick = () => {
  closeBigPicture();
};

const onLoaderClick = () => {
  renderNextComments();
};

const openBigPicture = (photo) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.removeEventListener('keydown', onEscKeyDown);
  document.addEventListener('keydown', onEscKeyDown);

  bigPictureImgElement.src = photo.url;
  likesCountElement.textContent = photo.likes;
  totalCountElement.textContent = photo.comments.length;
  captionElement.textContent = photo.description;

  currentComments = photo.comments;
  shownCommentsCount = 0;
  commentsListElement.innerHTML = '';

  socialCommentCountElement.classList.remove('hidden');
  commentLoaderElement.classList.remove('hidden');

  renderNextComments();
};

closeButtonElement.addEventListener('click', onCloseButtonClick);
commentLoaderElement.addEventListener('click', onLoaderClick);

export { openBigPicture, closeBigPicture };
