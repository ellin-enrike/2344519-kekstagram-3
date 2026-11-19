const FilterParameters = {
  chrome: {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    format: (value) => `grayscale(${value})`,
  },
  sepia: {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    format: (value) => `sepia(${value})`,
  },
  marvin: {
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    format: (value) => `invert(${value}%)`,
  },
  phobos: {
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    format: (value) => `blur(${value}px)`,
  },
  heat: {
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    format: (value) => `brightness(${value})`,
  },
};

const effectLevelElement = document.querySelector('.img-upload__effect-level');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const effectSliderElement = document.querySelector('.effect-level__slider');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
let currentEffect = 'none';
const noneEffectInputElement = effectsListElement.querySelector(
  'input[value="none"]'
);

const slider = noUiSlider.create(effectSliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const applyFilter = (value) => {

  const parameters = FilterParameters[currentEffect];

  if (!parameters) {
    imagePreviewElement.style.filter = '';
    effectLevelValueElement.value = '';
    return;
  }

  const filterValue = parameters.format(value);

  imagePreviewElement.style.filter = filterValue;
  effectLevelValueElement.value = value;
};

const setSlider = (values) => {
  slider.updateOptions({
    range: {
      min: values.min,
      max: values.max,
    },
    start: values.start,
    step: values.step,
  });

  effectLevelValueElement.value = values.start;
  applyFilter(values.start);
};

const onEffectsListChange = (evt) => {
  currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    imagePreviewElement.style.filter = '';
    effectLevelValueElement.value = '';
    effectLevelElement.classList.add('hidden');
    return;
  }

  effectLevelElement.classList.remove('hidden');
  setSlider(FilterParameters[currentEffect]);
};

const onSliderUpdate = (values, handle, unencoded) => {
  applyFilter(unencoded[0]);
};

const resetFilter = () => {
  currentEffect = 'none';

  noneEffectInputElement.checked = true;
  imagePreviewElement.style.filter = '';
  effectLevelValueElement.value = '';
  effectLevelElement.classList.add('hidden');
};

effectsListElement.addEventListener('change', onEffectsListChange);

slider.on('update', onSliderUpdate);

resetFilter();

export { resetFilter };
