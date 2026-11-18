import { isEscapeKey } from './utils.js';
import { resetScale } from './change-photo-scale.js';
import { resetFilter } from './photo-filters.js';
import {
  validateHashtagsFormat,
  validateHashtagsCount,
  validateHashtagsUniqueness,
  validateCommentLength,
} from './validation.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './user-modal.js';

const FILE_TYPES = ['jpeg', 'jpg', 'png'];

const HASHTAG_FORMAT_ERROR = 'Хештег должен начинаться с #, содержать только буквы и числа и иметь длину от 2 до 20 символов';
const HASHTAG_COUNT_ERROR = 'Нельзя указать больше пяти хештегов';
const HASHTAG_UNIQUENESS_ERROR = 'Хештеги не должны повторяться';
const COMMENT_LENGTH_ERROR = 'Комментарий не должен превышать 140 символов';

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
};

const bodyElement = document.body;
const imageUploadFormElement = document.querySelector('.img-upload__form');
const imageUploadInputElement = imageUploadFormElement.querySelector('.img-upload__input');
const imageUploadOverlayElement = imageUploadFormElement.querySelector('.img-upload__overlay');
const closeImageFormButtonElement = imageUploadFormElement.querySelector('.img-upload__cancel');
const submitButtonElement = imageUploadFormElement.querySelector('.img-upload__submit');
const hashTagFieldElement = imageUploadFormElement.querySelector('.text__hashtags');
const commentFieldElement = imageUploadFormElement.querySelector('.text__description');
const imagePreviewElement = imageUploadFormElement.querySelector('.img-upload__preview img');
const effectsPreviewElements = imageUploadFormElement.querySelectorAll('.effects__preview');

const pristine = new Pristine(imageUploadFormElement, pristineConfig, false);

pristine.addValidator(
  hashTagFieldElement,
  validateHashtagsFormat,
  HASHTAG_FORMAT_ERROR
);

pristine.addValidator(
  hashTagFieldElement,
  validateHashtagsCount,
  HASHTAG_COUNT_ERROR
);

pristine.addValidator(
  hashTagFieldElement,
  validateHashtagsUniqueness,
  HASHTAG_UNIQUENESS_ERROR
);

pristine.addValidator(
  commentFieldElement,
  validateCommentLength,
  COMMENT_LENGTH_ERROR
);

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseImageFormButtonClick();
  }
};

const onTextFieldKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

function showImageForm() {
  imageUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
}

function onCloseImageFormButtonClick() {
  imageUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  imageUploadFormElement.reset();
  pristine.reset();
  resetScale();
  resetFilter();

  document.removeEventListener('keydown', onEscKeyDown);
}

const onImageUploadInputChange = () => {
  const file = imageUploadInputElement.files[0];

  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((fileType) =>
    fileName.endsWith(`.${fileType}`)
  );

  if (!matches) {
    return;
  }

  const photoUrl = URL.createObjectURL(file);

  imagePreviewElement.src = photoUrl;

  effectsPreviewElements.forEach((previewElement) => {
    previewElement.style.backgroundImage = `url("${photoUrl}")`;
  });

  showImageForm();
};

const onImageUploadFormSubmit = (evt) => {
  evt.preventDefault();

  if (submitButtonElement.disabled) {
    return;
  }

  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  const formData = new FormData(imageUploadFormElement);

  submitButtonElement.disabled = true;

  sendData(formData)
    .then(() => {
      showSuccessMessage();
      onCloseImageFormButtonClick();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      submitButtonElement.disabled = false;
    });
};

imageUploadInputElement.addEventListener('change', onImageUploadInputChange);
closeImageFormButtonElement.addEventListener('click', onCloseImageFormButtonClick);

hashTagFieldElement.addEventListener('keydown', onTextFieldKeyDown);
commentFieldElement.addEventListener('keydown', onTextFieldKeyDown);

imageUploadFormElement.addEventListener('submit', onImageUploadFormSubmit);
