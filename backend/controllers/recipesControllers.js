import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

// getRecipes; +
// getPopularRecipes; +
// getRecipeById; +

// getOwnRecipes; +
// createRecipe; +
// deleteRecipe; +

// getFavoriteRecipes; +
// updateFavoriteRecipe;
// removeFavoriteRecipe;

export const getRecipes = async (req, res) => {
    // TODO: add service to get recipes according to provided params
    const recipes = await contactsService.listContacts({
        area: req.params.area,
        category: req.params.category,
        ingredients: req.params.ingredients,
    });
    res.json(recipes);
};

export const getPopularRecipes = async (req, res) => {
    // TODO: add service to get popular recipes
    const recipes = await contactsService.listContacts();
    res.json(recipes);
};

export const getRecipeById = async (req, res) => {
    // TODO: add service to get recipe details by id
    const recipe = await contactsService.getContactById({ id: req.params.id, owner });
    if (!recipe) {
        throw HttpError(404, "Not found");
    }
    res.json(recipe);
};

export const getOwnRecipes = async (req, res) => {
    const { id: owner } = req.user;
    // TODO: add service to get own recipes
    const recipes = await contactsService.listContacts({ owner });
    res.json(recipes);
};

export const deleteRecipe = async (req, res) => {
    const { id: owner } = req.user;
    // TODO: add service to delete recipe
    const recipe = await contactsService.removeContact({ id: req.params.id, owner });
    if (!recipe) {
        throw HttpError(404, "Not found");
    }
    res.json(recipe);
};

export const createRecipe = async (req, res) => {
    const { id: owner } = req.user;
    // update body parameters and add service to create recipe
    const { name, email, phone, favorite } = req.body;

    const recipe = await contactsService.addContact(owner, name, email, phone, favorite);
    res.status(201).json(recipe);
};

export const getFavoriteRecipes = async (req, res) => {
    const { id: owner } = req.user;
    // TODO: add service to get users favorite recipes
    const recipes = await contactsService.updateContactFavorite({ owner });
    if (!recipes) {
        throw HttpError(404, `Not found`);
    }
    res.status(200).json(recipes);
};

export const updateFavoriteRecipe = async (req, res) => {
    // TODO: discuss the way set and delete favorite will work
    // and should we use one patch function for this purpose
    const { id: owner } = req.user;
    const { id } = req.params;
    const recipe = await contactsService.updateContactFavorite({ id, owner }, req.body);
    if (!recipe) {
        throw HttpError(404, `Not found`);
    }
    res.status(200).json(recipe);
};
