import { isEscapeKey } from './utils.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const shownCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;

let currentComments;
let shownCommentsCount = 0;

const renderNextComments = () => {
  const nextPortion = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_STEP);
  shownCommentsCount += nextPortion.length;

  const fragment = document.createDocumentFragment();

  nextPortion.forEach((comment) => {
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

  commentsList.appendChild(fragment);
  shownCount.textContent = shownCommentsCount;

  if (shownCommentsCount >= currentComments.length) {

    commentLoader.classList.add('hidden');
  }
};

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
}

const onLoaderClick = () => {
  renderNextComments();
};

const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.removeEventListener('keydown', onEscKeyDown);
  document.addEventListener('keydown', onEscKeyDown);

  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  totalCount.textContent = photo.comments.length;
  caption.textContent = photo.description;

  currentComments = photo.comments;
  shownCommentsCount = 0;
  commentsList.innerHTML = '';

  socialCommentCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');

  renderNextComments();
};

closeButton.addEventListener('click', closeBigPicture);
commentLoader.addEventListener('click', onLoaderClick);

export { openBigPicture, closeBigPicture };
