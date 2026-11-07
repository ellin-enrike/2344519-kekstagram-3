import { isEscapeKey } from './utils.js';
import { resetScale } from './change-photo-scale.js';
import { resetFilter } from './photo-filters.js';
import {
  validateHashtagsFormat,
  validateHashtagsCount,
  validateHashtagsUniqueness,
  validateCommentLength,
} from './validation.js';

const bodyEl = document.body;
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const closeImgFormBtn = document.querySelector('.img-upload__cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const hashTagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
};

const pristine = new Pristine(imgUploadForm, pristineConfig, false);

pristine.addValidator(
  hashTagFieldElement,
  validateHashtagsFormat,
  'Хештег должен начинаться с #, содержать только буквы и числа и иметь длину от 2 до 20 символов'
);

pristine.addValidator(
  hashTagFieldElement,
  validateHashtagsCount,
  'Нельзя указать больше пяти хештегов'
);

pristine.addValidator(
  hashTagFieldElement,
  validateHashtagsUniqueness,
  'Хештеги не должны повторяться'
);

pristine.addValidator(
  commentFieldElement,
  validateCommentLength,
  'Комментарий не должен превышать 140 символов'
);

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseImgFormBtnClick();
  }
};

const onTextFieldKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

function showImgForm() {
  imgUploadOverlay.classList.remove('hidden');
  bodyEl.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
}

function onCloseImgFormBtnClick() {
  imgUploadOverlay.classList.add('hidden');
  bodyEl.classList.remove('modal-open');

  imgUploadForm.reset();
  pristine.reset();
  resetScale();
  resetFilter();
  document.removeEventListener('keydown', onEscKeyDown);
}

const onImgUploadFormSubmit = (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
};

imgUploadInput.addEventListener('change', showImgForm);
closeImgFormBtn.addEventListener('click', onCloseImgFormBtnClick);

hashTagFieldElement.addEventListener('keydown', onTextFieldKeyDown);
commentFieldElement.addEventListener('keydown', onTextFieldKeyDown);

imgUploadForm.addEventListener('submit', onImgUploadFormSubmit);
