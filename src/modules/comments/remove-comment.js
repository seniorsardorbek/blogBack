const { NotFoundError } = require('../../shared/errors');
const Comment = require('./Comments');

const removeComment = async ({ id }) => {
  const existing = await Comment.findById(id);

  if (!existing) {
    throw new NotFoundError('Blog is not found!');
  }

  return Comment.findByIdAndRemove(id);
};

module.exports = removeComment;
