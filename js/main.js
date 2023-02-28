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

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getUniqueCommentId = createRandomIdFromRangeGenerator(26, 1000);
const getUniqueUserId = createRandomIdFromRangeGenerator(1, 25);
const getUniquePhotoId = createRandomIdFromRangeGenerator(1, 25);

const createUserComments = () => ({
  id: getUniqueCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createUser = () => ({
  id: getUniqueUserId(),
  url: `photos/${ getUniquePhotoId() }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  name: getRandomArrayElement(NAMES),
  comment: createUserComments(),
});

Array.from({length: 25}, createUser);
