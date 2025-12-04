import Joi from "joi";
import { emailRegExp } from "../constants/authConstants.js";

export const registerSchema = Joi.object({
    password: Joi.string().required().min(8).messages({
        "any.required": "Username is required",
        "string.base": "Password must be a string",
        // min: "Password must be at least 8 symbols",
    }),

    email: Joi.string().pattern(emailRegExp).required().messages({
        "any.required": "Username is required",
    }),
});

export const loginSchema = Joi.object({
    password: Joi.string().required().min(8).messages({
        "any.required": "Username is required",
    }),

    email: Joi.string().pattern(emailRegExp).required().messages({
        "any.required": "Username is required",
    }),
});
