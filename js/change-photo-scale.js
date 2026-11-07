const ScaleParams = {
  DEFAULT: 100,
  STEP: 25,
  MIN: 25,
  MAX: 100
};

const scaleDecreaseButtonElement = document.querySelector('.scale__control--smaller');
const scaleIncreaseButtonElement = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

let currentScale = ScaleParams.DEFAULT;

const updateScale = () => {
  scaleInputElement.value = `${currentScale}%`;
  imagePreviewElement.style.transform = `scale(${currentScale / 100})`;
};

const onScaleDecreaseButtonClick = () => {
  if (currentScale > ScaleParams.MIN) {
    currentScale -= ScaleParams.STEP;
    updateScale();
  }
};

const onScaleIncreaseButtonClick = () => {
  if (currentScale < ScaleParams.MAX) {
    currentScale += ScaleParams.STEP;
    updateScale();
  }
};

const resetScale = () => {
  currentScale = ScaleParams.DEFAULT;
  updateScale();
};

scaleDecreaseButtonElement.addEventListener(
  'click',
  onScaleDecreaseButtonClick
);

scaleIncreaseButtonElement.addEventListener(
  'click',
  onScaleIncreaseButtonClick
);

resetScale();

export { resetScale };
