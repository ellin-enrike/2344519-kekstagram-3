// Функция для получения случайного целого числа в диапазоне [min, max]
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

// Генератор уникальных ID (для комментариев)
function createIdGenerator() {
  let lastId = 0;
  return function() {
    lastId += 1;
    return lastId;
  };
}

export {getRandomInteger, createIdGenerator};
