const Blog = require('./Blog');

const addBlog = async (data) => {
  const result = await Blog.create(data);

  return result;
};

module.exports = addBlog;

