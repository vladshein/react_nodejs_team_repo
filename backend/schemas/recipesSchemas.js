import Joi from "joi";

//TODO: add correct schema fields and types
export const createRecipeSchema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        "any.required": "name is required",
        "string.base": "name must be a string",
    }),
    email: Joi.string().email().required().messages({
        "any.required": "email is required",
        "string.base": "email must be a valid string",
    }),
    phone: Joi.string()
        .pattern(/^\+?[0-9\s\-]{7,15}$/)
        .required()
        .messages({
            "any.required": "phone is required",
            "string.base": "phone must be a valid string",
        }),
    favorite: Joi.boolean().messages({
        "boolean.base": '"favorite" must be true or false',
    }),
}).required();

export const updateRecipeSchema = Joi.object({
    name: Joi.string().min(2).max(50).messages({
        "string.base": "name must be a valid string",
    }),
    email: Joi.string().email().messages({
        "string.base": "email must be a valid string",
    }),
    phone: Joi.string()
        .pattern(/^\+?[0-9\s\-]{7,15}$/)
        .messages({
            "string.base": "phone must be a valid string",
        }),
    favorite: Joi.boolean().messages({
        "boolean.base": '"favorite" must be true or false',
    }),
})
    .min(1)
    .messages({ "object.min": "Body must have at least one field" });

export const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
        "boolean.base": '"favorite" must be true or false',
        "any.required": '"favorite" is a required field',
    }),
});
