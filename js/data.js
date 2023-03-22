import {getRandomArrayElement} from './get-random-element.js';
import {getRandomInteger} from './get-random-element.js';
import {createRandomIdFromRangeGenerator} from './get-random-id.js';

const MIN_COUNT_USERS_ID = 1;
const MAX_COUNT_USERS_ID = 25;
const MIN_COUNT_COMMENTS_ID = 26;
const MAX_COUNT_COMMENTS_ID = 1000;
const MIN_COUNT_PHOTOS_ID = 1;
const MAX_COUNT_PHOTOS_ID = 25;
const MIN_COUNT_LIKE = 15;
const MAX_COUNT_LIKE = 200;
const MIN_COUNT_AVATAR = 1;
const MAX_COUNT_AVATAR = 6;
const MIN_COUNT_MESSAGES = 0;
const MAX_COUNT_MESSAGES = 7;
const MIN_COUNT_COMMENTS = 0;
const MAX_COUNT_COMMENTS = 30;


const SIMILAR_PHOTOS_COUNT = 25;

const NAMES = [
  'Иван',
  'Андрей',
  'Сергей',
  'Полина',
  'Маша',
  'Катя',
  'Дима',
  'Арсений',
  'Олеся',
  'Кирилл',
  'Ира',
  'Алена',
  'Коля',
  'Инна',
  'Оля',
  'Маргарита',
  'Настя',
  'Даша',
  'Платон',
  'Елисей',
  'Никита',
  'Максим',
  'Данил',
  'Эдик',
  'Таня',
];

const DESCRIPTIONS = [
  'Какой хороший день!',
  'А ведь так все здорово',
  'Этот день был великолепен',
  'Эти выходные были лучшими за последний год',
  'Вы только посмотрите на ЭТО...',
  'Кто бы мог подумать? Даже не верится, что это произошло!',
  'Так начинается мое типичное утро',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const getUniqueCommentId = createRandomIdFromRangeGenerator(MIN_COUNT_COMMENTS_ID, MAX_COUNT_COMMENTS_ID);
const getUniqueUserId = createRandomIdFromRangeGenerator(MIN_COUNT_USERS_ID, MAX_COUNT_USERS_ID);
const getUniquePhotoId = createRandomIdFromRangeGenerator(MIN_COUNT_PHOTOS_ID, MAX_COUNT_PHOTOS_ID);

const createPhotosComments = () => ({
  id: getUniqueCommentId(),
  avatar: `img/avatar-${ getRandomInteger(MIN_COUNT_AVATAR, MAX_COUNT_AVATAR) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createRandomNumber = () => {
  const uniqueCommentMessage = getRandomInteger (MIN_COUNT_MESSAGES, MAX_COUNT_MESSAGES);
  const uniqueCommentAvatar = getRandomInteger (MIN_COUNT_AVATAR, MAX_COUNT_AVATAR);
  const countNumber = getRandomInteger(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS);
  const comments = [];

  for (let i = 0; i < countNumber; i++) {
    comments[i] = createPhotosComments(uniqueCommentAvatar, uniqueCommentMessage);
  }

  return comments;
};

const createPhotos = () => ({
  id: getUniqueUserId(),
  url: `photos/${ getUniquePhotoId() }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_COUNT_LIKE, MAX_COUNT_LIKE),
  name: getRandomArrayElement(NAMES),
  comments: createRandomNumber(),
});

const newPhotos = Array.from({length: SIMILAR_PHOTOS_COUNT}, createPhotos);

export {newPhotos};
