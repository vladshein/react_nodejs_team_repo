import {
    getCategories,
    getAreas,
    getIngredients,
    getTestimonials,
} from "../services/commonServices.js";

export const categoriesController = async (req, res) => {
    // const { id: owner } = req.user;
    const contacts = await commonServices.getCategories({ owner });
    res.json(contacts);
};

export const areasController = async (req, res) => {
    // const { id: owner } = req.user;
    const contacts = await commonServices.getAreas({ owner });
    res.json(contacts);
};

export const ingredientsController = async (req, res) => {
    const { id: owner } = req.user;
    const contacts = await commonServices.getIngredients({ owner });
    res.json(contacts);
};

export const testimonialsController = async (req, res) => {
    const { id: owner } = req.user;
    const contacts = await commonServices.getTestimonials({ owner });
    res.json(contacts);
};
