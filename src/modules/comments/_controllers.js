const express = require("express");
const httpValidator = require("../../shared/http-validator");
const removeBlog = require("./remove-comment");
const addComment = require("./add-comment");
const listComments = require("./list-comments");
const { ondeIdSchema } = require("../blogs/_schemas");
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getComments = async (req, res, next) => {
  try {
    httpValidator({ params :req.params }, ondeIdSchema);
    const {id} =  req.params
    const result = await listComments({id});
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// !PostBlogs!
const postComments = async (req, res, next) => {
  try {
    httpValidator({ params :req.params }, ondeIdSchema);
    const {id} = req.params
    const result = await addComment({
      user: req.user.id,
      blog : id , 
      ...req.body,
    });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteComment = async (req, res, next) => {
  try {
    httpValidator({ params :req.params }, ondeIdSchema);
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
  deleteComment ,
  postComments ,
  getComments
};
