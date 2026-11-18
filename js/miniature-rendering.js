import { getData } from './api.js';
import { openBigPicture } from './big-picture.js';
import { showDataError } from './user-modal.js';
import { debounce, getRandomInteger } from './utils.js';

const RANDOM_PHOTOS_COUNT = 10;
const DELAY_TIME_RENDER_PHOTOS = 500;
const picturesContainer = document.querySelector('.pictures');
const imgFiltersElement = document.querySelector('.img-filters');
const imgFiltersFormElement = document.querySelector('.img-filters__form');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

let photos = [];

const renderPhoto = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImgElement = pictureElement.querySelector('.picture__img');

  pictureImgElement.src = photo.url;
  pictureImgElement.alt = photo.description;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  const onPictureElementClick = (evt) => {
    evt.preventDefault();
    openBigPicture(photo);
  };

  pictureElement.addEventListener('click', onPictureElementClick);

  return pictureElement;
};

const renderPhotos = (photosToRender) => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });

  const fragment = document.createDocumentFragment();

  photosToRender.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });

  picturesContainer.append(fragment);
};

const getDefaultPhotos = () => photos;

const getRandomPhotos = () => {
  const randomIndexes = [];

  while (randomIndexes.length < RANDOM_PHOTOS_COUNT) {
    const randomIndex = getRandomInteger(0, photos.length - 1);

    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
  }

  return photos.filter((photo, index) => randomIndexes.includes(index));
};

const getDiscussedPhotos = () =>
  [...photos].sort(
    (photoA, photoB) => photoB.comments.length - photoA.comments.length
  );

const Filter = {
  'filter-default': getDefaultPhotos,
  'filter-random': getRandomPhotos,
  'filter-discussed': getDiscussedPhotos,
};

const onImgFiltersFormChange = (filterId) => {
  const currentFilter = Filter[filterId];

  if (!currentFilter) {
    return;
  }
  renderPhotos(currentFilter());
};

const debouncedRenderPhotos = debounce(onImgFiltersFormChange, DELAY_TIME_RENDER_PHOTOS);

const onImgFiltersFormClick = (evt) => {
  const button = evt.target.closest('.img-filters__button');

  if (!button) {
    return;
  }

  imgFiltersFormElement
    .querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');

  button.classList.add('img-filters__button--active');
  debouncedRenderPhotos(button.id);
};

getData()
  .then((receivedPhotos) => {
    photos = receivedPhotos;

    renderPhotos(photos);
    imgFiltersElement.classList.remove('img-filters--inactive');
  })
  .catch(() => {
    showDataError();
  });

imgFiltersFormElement.addEventListener('click', onImgFiltersFormClick);
