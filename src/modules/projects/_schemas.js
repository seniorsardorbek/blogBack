const Joi = require("joi");

exports.postProjectsSchema = {
  body: Joi.object({
    description: Joi.string().required(),
    link: Joi.string().required(),
  }),
};

exports.patchProjectSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    description: Joi.string(),
    link: Joi.string(),
  }),
};

exports.ondeIdSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
