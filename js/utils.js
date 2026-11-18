const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

function createIdGenerator() {
  let lastId = 0;
  return function() {
    lastId += 1;
    return lastId;
  };
}
const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomInteger, createIdGenerator, isEscapeKey, debounce};


