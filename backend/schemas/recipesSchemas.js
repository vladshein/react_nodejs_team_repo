import Joi from 'joi';

//TODO: add correct schema fields and types
export const createRecipeSchema = Joi.object({
  title: Joi.string().min(2).max(50).required().messages({
    'any.required': 'title is required',
    'string.base': 'title must be a string',
  }),
  category: Joi.string().required().messages({
    'any.required': 'category is required',
    'string.base': 'category must be a valid string',
  }),
  area: Joi.string().required().messages({
    'any.required': 'area is required',
    'string.base': 'area must be a valid string',
  }),
  instructions: Joi.string().required().messages({
    'any.required': 'instructions is required',
    'string.base': 'instructions must be a valid string',
  }),
  description: Joi.string().required().messages({
    'any.required': 'description is required',
    'string.base': 'description must be a valid string',
  }),
  thumb: Joi.string().required().messages({
    'string.base': 'thumb must be a valid link',
  }),
  time: Joi.string().required().messages({
    'any.required': 'time is required',
    'string.base': 'email must be a valid string',
  }),
  ingredients: Joi.array().required().required(),
}).required();

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'boolean.base': '"favorite" must be true or false',
    'any.required': '"favorite" is a required field',
  }),
});

/**
 * for pagination
 */
export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});
