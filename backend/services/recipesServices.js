// getRecipes; +
// getPopularRecipes; +
// getRecipeById; +

// getOwnRecipes;
// createRecipe; +
// deleteRecipe; +

// getFavoriteRecipes; +
// updateFavoriteRecipe +
// removeFavoriteRecipe; +

import Recipe from "../db/models/Recipe.js";

async function getRecipes(where) {
    return await Recipe.findAll({ where });
}

//TODO: add correct processing
async function getPopularRecipes(where) {
    return await Recipe.findAll({ where });
}

async function getOwnRecipes(where) {
    return await Recipe.findAll({ where: owner });
}
async function getRecipeById(where) {
    return await Recipe.findOne({ where });
}

async function deleteRecipe(where) {
    const recipe = await getRecipeById(where);
    if (!recipe) return null;

    await recipe.destroy();
    return recipe;
}

async function addRecipe(owner, favorite = false) {
    const newRecipe = Recipe.create({
        owner,
        title,
        description,
        instructions,
        thumb,
        time,
        category,
        area,
    });
    return newRecipe;
}

async function updateFavoriteRecipe(where) {
    const recipe = await getRecipeById(where);
    if (!recipe) return null;

    await recipe.update({ favorite: true });
    return recipe;
}

async function removeFavoriteRecipe(where) {
    const recipe = await getRecipeById(where);
    if (!recipe) return null;

    await recipe.update({ favorite: false });
    return recipe;
}

export default {
    getRecipes,
    getRecipeById,
    addRecipe,
    deleteRecipe,
    getOwnRecipes,
    updateFavoriteRecipe,
    removeFavoriteRecipe,
    updateContact,
    updateContactFavorite,
};
