import { getRandomInteger, createIdGenerator } from './utils.js';
import { USERS, COMMENTS, SIMILAR_PHOTO_DESCRIPTION_COUNT, AVATAR_COUNT, MIN_LIKES_QUANTITY, MAX_LIKES_QUANTITY,MAX_COMMENTS_QUANTITY} from './photo-data.js';

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

// Функция для создания массива из 25 объектов
const similarPhotos = () =>
  Array.from({ length: SIMILAR_PHOTO_DESCRIPTION_COUNT }, (_, index) => createPhotoDescription(index));

export {similarPhotos};
