const Blog = require('./Blog');

const listBlogs = async () => {
  const Blogs = await Blog.find();

  return Blogs;
};

module.exports = listBlogs;
