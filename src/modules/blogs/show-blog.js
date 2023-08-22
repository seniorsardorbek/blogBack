const { NotFoundError } = require("../../shared/errors");
const Blog = require("./Blog.js");

const showBlog = async ({ id }) => {
    const blog = await Blog.findById(id).populate('user' ,"email" )

    if (!blog) {
        throw new NotFoundError("Blog topilmadi.");
    }
    blog.views++
    blog.save()

    return blog;
};

module.exports = showBlog;
