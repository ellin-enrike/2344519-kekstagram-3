const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const HASHTAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;

const getHashtags = (value) => {
  const normalizedValue = value.trim();

  if (normalizedValue === '') {
    return [];
  }

  return normalizedValue.split(/\s+/);
};

const validateHashtagsFormat = (value) => {
  const hashtags = getHashtags(value);

  return hashtags.every((hashtag) => HASHTAG_REG_EXP.test(hashtag));
};

const validateHashtagsCount = (value) => {
  const hashtags = getHashtags(value);

  return hashtags.length <= MAX_HASHTAGS_COUNT;
};

const validateHashtagsUniqueness = (value) => {
  const hashtags = getHashtags(value)
    .map((hashtag) => hashtag.toLowerCase());

  return new Set(hashtags).size === hashtags.length;
};

const validateCommentLength = (value) =>
  value.length <= MAX_COMMENT_LENGTH;

export {
  validateHashtagsFormat,
  validateHashtagsCount,
  validateHashtagsUniqueness,
  validateCommentLength,
};
