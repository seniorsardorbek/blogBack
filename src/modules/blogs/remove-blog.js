const { NotFoundError } = require('../../shared/errors');
const Blog = require('./Blog');

const removeBlog = async ({ id }) => {
  const existing = await Blog.findById(id);

  if (!existing) {
    throw new NotFoundError('Blog is not found!');
  }

  return Blog.findByIdAndRemove(id);
};

module.exports = removeBlog;
