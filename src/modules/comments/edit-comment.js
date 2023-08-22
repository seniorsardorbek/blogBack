const { NotFoundError } = require('../../shared/errors');
const Blog = require('./Comments');

const editBlog = async ({ id, ...changes }) => {
  const existing = await Blog.findById(id);

  if (!existing) {
    throw new NotFoundError('Blog is not found!');
  }

  return Blog.findByIdAndUpdate(id, changes, { new: true });
};

module.exports = editBlog;
