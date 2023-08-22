const Comment = require('./Comments');

const addComment = async (data) => {
  const result = (await Comment.create(data)).populate('user');
  return result;
};

module.exports = addComment;

