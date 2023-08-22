const express = require("express");
const httpValidator = require("../../shared/http-validator");
const listBlogs = require("./list-blogs");
const addBlog = require("./add-blog");
const uuid = require("uuid");
const fs = require("fs");

const cloudinary = require("cloudinary");
const removeBlog = require("./remove-blog");
const Blog = require("./Blog");
const showBlog = require("./show-blog");
const { NotFoundError } = require("../../shared/errors");
const editBlog = require("./edit-blog");
const { patchBlogSchema, postBlogsSchema, ondeIdSchema } = require("./_schemas");
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getBlogs = async (_, res, next) => {
  try {
    const result = await listBlogs();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogs = await showBlog({ id });

    res.status(200).json({
      blog: blogs,
    });
  } catch (error) {
    next(error);
  }
};
// !PostBlogs!
const postBlogs = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postBlogsSchema );
    let picture = req.files?.pictures;
    if (picture) {
      const picturename =
        picture && `${uuid.v4()}.${picture?.mimetype.split("/")[1]}`;
      await picture?.mv(`${process.cwd()}/uploads/${picturename}`);
      picture = await cloudinary.v2.uploader.upload(
        `${process.cwd()}/uploads/${picturename}`,
        { public_id: picturename },
        function (error, result) {
          return result;
        }
      );
      if (picture) {
        fs.unlinkSync(`${process.cwd()}/uploads/${picturename}`);
      }
    }
    const result = await addBlog({
      user: req.user.id,
      ...req.body,
      pictures: picture?.secure_url,
    });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// ! Add Like
const addLike = async (req, res, next) => {
  try {
    httpValidator({ params :req.params }, ondeIdSchema);;
    const { id } = req.user;
    const bId = req.params?.id;
    const exist = await Blog.findById(bId);
    if (!exist) {
      throw new NotFoundError("Blog is not found!");
    }
    const likes = exist.likes;
    if (likes.includes(id)) {
      const indexToRemove = likes.indexOf(id);
      const result = await Blog.findById(bId);
      result.likes.splice(indexToRemove, 1);
      result.save();
      return res.status(200).json({
        blog: result,
      });
    }

    const result = await Blog.findOneAndUpdate(
      { _id: bId },
      { $push: { likes: id } },
      { new: true }
    ).select('-title -pictures -comments  -user -updatedAt  -text -createdAt');

    res.status(200).json({
      blog: result,
    });
  } catch (error) {
    next(error);
  }
};
const editblog = async (req, res, next) => {
  try {
    httpValidator({ body: req.body , params : req.params }, patchBlogSchema);
    const { id } = req.params;
    const result = await editBlog({ id: id, ...req.body });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    httpValidator({ params :req.params.id }, ondeIdSchema);
    const { id } = req.params;
    const result = await removeBlog({ id: id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogs,
  getBlog,
  postBlogs,
  deleteBlog,
  addLike,
  editblog
};
