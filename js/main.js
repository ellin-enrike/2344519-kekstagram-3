
const USERS = ['Сергей', 'Владимир', 'Илья', 'Андрей', 'Ольга', 'Тамара', 'Виктор', 'Юрий', 'Алла', 'Валерий', 'Ян', 'Леопольд', 'Марк', 'Василиса'];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const SIMILAR_PHOTO_DESCRIPTION_COUNT = 25;
const AVATAR_COUNT = 6;
const MIN_LIKES_QUANTITY = 15;
const MAX_LIKES_QUANTITY = 200;
const MAX_COMMENTS_QUANTITY = 30;

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

const getUniqueCommentId = createIdGenerator();

// Создание одного комментария
const createUserComment = () => {
  const randomNameIndex = getRandomInteger(0, USERS.length - 1);
  const randomMessageIndex = getRandomInteger(0, COMMENTS.length - 1);
  const randomAvatarIndex = getRandomInteger(1, AVATAR_COUNT);

  return {
    id: getUniqueCommentId(),
    avatar: `img/avatar-${randomAvatarIndex}.svg`,
    message: COMMENTS[randomMessageIndex],
    name: USERS[randomNameIndex],
  };
};

// Генерация массива комментариев для одной фотографии
const generatePhotoComments = () => {
  const count = getRandomInteger(0, MAX_COMMENTS_QUANTITY);
  return Array.from({ length: count }, () => createUserComment());
};

// Создание описания одной фотографии
const createPhotoDescription = (index) => {

  const id = index + 1;

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: 'Авторское фото нашего любимого пользователя',
    likes: getRandomInteger(MIN_LIKES_QUANTITY, MAX_LIKES_QUANTITY),
    comments: generatePhotoComments(),
  };
};

// Финальный массив из 25 объектов
export const similarPhotoDescriptions = Array.from({ length: SIMILAR_PHOTO_DESCRIPTION_COUNT },(_, index) => createPhotoDescription(index)
);


