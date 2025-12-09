import recipesServices from "../services/recipesServices.js";
import HttpError from "../helpers/HttpError.js";

// +, no owner = public
export const getRecipes = async (req, res) => {
    // TODO: add service to get recipes according to provided params
    const recipes = await recipesServices.getRecipes({
        area: req.params.area,
        category: req.params.category,
        ingredients: req.params.ingredients,
    });
    res.json(recipes);
};

// +, no owner = public
export const getRecipeById = async (req, res) => {
    // TODO: add service to get recipe details by id
    const recipe = await recipesServices.getRecipeById({ id: req.params.id });
    if (!recipe) {
        throw HttpError(404, "Not found");
    }
    res.json(recipe);
};

// +
export const getOwnRecipes = async (req, res) => {
    const { id: owner } = req.user;
    const recipes = await recipesServices.getRecipes({ owner });
    res.json(recipes);
};

// +
export const deleteRecipe = async (req, res) => {
    const { id: owner } = req.user;
    // TODO: add service to delete recipe
    const recipe = await recipesServices.deleteRecipe({ id: req.params.id, owner });
    if (!recipe) {
        throw HttpError(404, "Not found");
    }
    res.json(recipe);
};

export const createRecipe = async (req, res) => {
    const { id: owner } = req.user;

    const recipe = await recipesServices.addRecipe({ ...req.body, owner });
    res.status(201).json(recipe);
};

export const getFavoriteRecipes = async (req, res) => {
    const { id: owner } = req.user;
    // TODO: add service to get users favorite recipes
    const recipes = await recipesServices.getPopularRecipes({ owner });
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
    const recipe = await recipesServices.updateFavoriteRecipe({ id, owner }, req.body);
    if (!recipe) {
        throw HttpError(404, `Not found`);
    }
    res.status(200).json(recipe);
};

export const removeFavoriteRecipe = async (req, res) => {
    // TODO: discuss the way set and delete favorite will work
    // and should we use one patch function for this purpose
    const { id: owner } = req.user;
    const { id } = req.params;
    const recipe = await recipesServices.removeFavoriteRecipe({ id, owner }, req.body);
    if (!recipe) {
        throw HttpError(404, `Not found`);
    }
    res.status(200).json(recipe);
};

export const getPopularRecipes = async (req, res) => {
    // TODO: add service to get popular recipes
    const recipes = await recipesServices.getPopularRecipes();
    res.json(recipes);
};
