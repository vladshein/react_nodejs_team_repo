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

async function addRecipe(payload) {
    const newRecipe = await Recipe.create({
        title: payload.title,
        description: payload.description,
        instructions: payload.instructions,
        thumb: payload.thumb,
        time: payload.time,
        ownerId: payload.ownerId,
        categoryId: payload.categoryId,
        areaId: payload.areaId,
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

async function getFavoriteRecipes(where) {
    //TODO
    // get own recipes, where favorite is true
    const recipe = await getOwnRecipes(where);
    if (!recipe) return null;

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
    getPopularRecipes,
};
