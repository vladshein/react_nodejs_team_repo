import recipesServices from "../services/recipesServices.js";
import HttpError from "../helpers/HttpError.js";

// +, no owner = public
export const getRecipesController = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const { recipes, pagination } = await recipesServices.getRecipes({
        category: req.query.category,
        area: req.query.area,
        ingredients: req.query.ingredients,
        page,
        limit,
    });
    
    res.json({ recipes, pagination });
};

// +, no owner = public
export const getRecipeByIdController = async (req, res) => {
    // TODO: add service to get recipe details by id
    const recipe = await recipesServices.getRecipeById(req.params.id);
    if (!recipe) {
        throw HttpError(404, "Not found");
    }
    res.json(recipe);
};

// +, no owner public
export const getPopularRecipesController = async (req, res) => {
    // TODO: add service to get popular recipes
    const recipes = await recipesServices.getPopularRecipes();
    res.json(recipes);
};

// +
export const getOwnRecipesController = async (req, res) => {
    const { id: ownerId } = req.user;
    const { recipes, pagination } = await recipesServices.getRecipes({ ownerId });
    res.json({ recipes, pagination });
};

// +
export const deleteRecipeController = async (req, res) => {
    const { id: ownerId } = req.user;
    // TODO: add service to delete recipe
    const recipe = await recipesServices.deleteRecipe(req.params.id, ownerId);
    if (!recipe) {
        throw HttpError(404, "Recipe not found");
    }
    res.json(recipe);
};

// +
export const createRecipeController = async (req, res) => {
    const { id: ownerId } = req.user;

    const recipe = await recipesServices.addRecipe({ ...req.body, ownerId });
    res.status(201).json(recipe);
};

// +
export const getFavoriteRecipesController = async (req, res) => {
    const { id: ownerId } = req.user;
    // TODO: add service to get users favorite recipes
    const recipes = await recipesServices.getFavoriteRecipes(ownerId);
    if (!recipes) {
        throw HttpError(404, `Not found`);
    }
    res.status(200).json(recipes);
};

export const updateFavoriteRecipeController = async (req, res) => {
    const { id: ownerId } = req.user;
    const { id } = req.params;
    
    const fav = await recipesServices.addFavoriteRecipe(ownerId, id);
    
    if (!fav) {
        throw HttpError(404, `Recipe not found`);
    }
    
    res.status(200).json({
        message: "Recipe added to favorites",
        data: fav
    });
};


export const removeFavoriteRecipeController = async (req, res) => {
    const { id: ownerId } = req.user;
    const { id } = req.params;
    
    const fav = await recipesServices.removeFavoriteRecipe(ownerId, id);
    
    if (!fav) {
        throw HttpError(404, `Recipe not found in favorites`);
    }
    
    res.status(200).json({
        message: "Recipe removed from favorites",
        data: fav
    });
};
