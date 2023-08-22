const Joi = require('joi');

exports.postBlogsSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    text: Joi.string().required(),
  }),
};

exports.patchBlogSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    title: Joi.string(),
    text: Joi.string()
  }),
};


exports.ondeIdSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};


