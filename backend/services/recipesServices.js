import { Recipe, Category, Area, Ingredient, User, FavoriteRecipe } from '../db/models/index.js';
import { Sequelize } from 'sequelize';
import { ObjectId } from 'bson';
import HttpError from '../helpers/HttpError.js';

// async function getRecipes(where) {
//     return await Recipe.findAll({ where });
// }
async function getRecipes(filters = {}) {
  const where = {};
  const include = [];
  include.push({
    model: Category,
    as: 'category',
    attributes: ['id', 'name'],
    ...(filters.category && { where: { name: filters.category } }),
  });
  include.push({
    model: Area,
    as: 'area',
    attributes: ['id', 'name'],
    ...(filters.area && { where: { name: filters.area } }),
  });
  include.push({
    model: User,
    as: 'owner',
    attributes: ['id', 'name', 'avatar'],
  });
  include.push({
    model: Ingredient,
    as: 'ingredients',
    through: { attributes: ['measure'] },
    ...(filters.ingredients && { where: { id: filters.ingredients } }),
  });
  return await Recipe.findAll({ where, include });
}
//TODO: add correct processing
// async function getPopularRecipes(where) {
//     return await Recipe.findAll({ where });
// }
// Get popular recipes (sorted by favorites count)
async function getPopularRecipes() {
  return await Recipe.findAll({
    attributes: {
      include: [[Sequelize.fn('COUNT', Sequelize.col('favoritedBy.id')), 'favoritesCount']],
    },
    include: [
      {
        model: User,
        as: 'favoritedBy',
        attributes: [],
        through: { attributes: [] },
      },
    ],
    group: ['Recipe.id'],
    order: [[Sequelize.literal('favoritesCount'), 'DESC']],
    limit: 10,
  });
}

// Get recipes owned by a user
async function getOwnRecipes(ownerId) {
  return await Recipe.findAll({ where: { ownerId } });
}
// async function getRecipeById(where) {
//     return await Recipe.findOne({ where });
// }
// Get recipe by ID
async function getRecipeById(id) {
  return await Recipe.findByPk(id, {
    include: [
      { model: User, as: 'owner', attributes: ['id', 'name', 'avatar'] },
      { model: Category, as: 'category', attributes: ['id', 'name'] },
      { model: Area, as: 'area', attributes: ['id', 'name'] },
      {
        model: Ingredient,
        as: 'ingredients',
        through: { attributes: ['measure'] },
      },
    ],
  });
}
async function deleteRecipe(id, ownerId) {
  const recipe = await Recipe.findOne({ where: { id, ownerId } });
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
// async function addFavoriteRecipe(where) {
//     const recipe = await getRecipeById(where);
//     if (!recipe) return null;
//     await recipe.update({ favorite: true });
//     return recipe;
// }
// Add recipe to favorites
async function addFavoriteRecipe(userId, recipeId) {
  const recipe = await Recipe.findByPk(recipeId);
  if (!recipe) {
    throw HttpError(404, 'Recipe not found');
  }

  const existingFavorite = await FavoriteRecipe.findOne({
    where: { userId, recipeId },
  });

  if (existingFavorite) {
    throw HttpError(409, 'Recipe already in favorites');
  }

  return await FavoriteRecipe.create({ userId, recipeId });
  await Recipe.increment('favoritesCount', { by: 1, where: { id: recipeId } });
  return await FavoriteRecipe.create({ userId, recipeId });
}

// async function removeFavoriteRecipe(where) {
//     const recipe = await getRecipeById(where);
//     if (!recipe) return null;
//     await recipe.update({ favorite: false });
//     return recipe;
// }
// Remove recipe from favorites
async function removeFavoriteRecipe(userId, recipeId) {
  await Recipe.decrement('favoritesCount', { by: 1, where: { id: recipeId } });
  const fav = await FavoriteRecipe.findOne({ where: { userId, recipeId } });
  if (!fav) return null;
  await fav.destroy();
  return fav;
}
// async function getFavoriteRecipes(where) {
//     //TODO
//     // get own recipes, where favorite is true
//     const recipe = await getOwnRecipes(where);
//     if (!recipe) return null;
//     return recipe;
// }
// Get favorite recipes for a user

const getFavoriteRecipes = async (userId) => {
  const recipes = await Recipe.findAll({
    include: [
      {
        model: User,
        as: 'favoritedBy',
        where: { id: userId },
        attributes: [],
        through: { attributes: [] },
      },
      {
        model: User,
        as: 'owner',
        attributes: ['id', 'name', 'avatar'],
      },
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
      {
        model: Area,
        as: 'area',
        attributes: ['id', 'name'],
      },
    ],
  });

  return recipes;
};

export default {
  getRecipes,
  getRecipeById,
  addRecipe,
  deleteRecipe,
  getOwnRecipes,
  addFavoriteRecipe,
  removeFavoriteRecipe,
  getPopularRecipes,
  getFavoriteRecipes,
};
