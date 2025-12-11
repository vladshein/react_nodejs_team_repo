import { Recipe, Category, Area, Ingredient, User, FavoriteRecipe } from '../db/models/index.js';
import { Sequelize } from 'sequelize';
import { ObjectId } from 'bson';
import HttpError from '../helpers/HttpError.js';

// async function getRecipes(where) {
//     return await Recipe.findAll({ where });
// }

async function getRecipes(filters = {}) {
  const where = {};

  // filter by ownerId
  if (filters.ownerId) {
    where.ownerId = filters.ownerId;
  }

  const include = [
    { model: Category, as: 'category', attributes: ['id', 'name'] },
    { model: Area, as: 'area', attributes: ['id', 'name'] },
    { model: User, as: 'owner', attributes: ['id', 'name', 'avatar'] },
  ];

  // filter by category (selected from CATEGORIES page)
  if (filters.category) {
    include[0].where = { name: filters.category };
    include[0].required = true;
  }

  // filter by area
  if (filters.area) {
    include[1].where = { name: filters.area };
    include[1].required = true;
  }

  // filter by ingredients (join table)
  if (filters.ingredients) {
    include.push({
      model: Ingredient,
      as: 'ingredients',
      through: { attributes: ['measure'] },
      where: { id: filters.ingredients }, // can be array of IDs
    });
  } else {
    include.push({
      model: Ingredient,
      as: 'ingredients',
      through: { attributes: ['measure'] },
    });
  }

  // Pagination
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const offset = (page - 1) * limit;

  // Get total count with distinct
  const count = await Recipe.count({
    where,
    include: include.filter(inc => inc.required), // Only include required (filtered) associations for count
    distinct: true,
    col: 'id',
  });

  // Get recipes with pagination
  const rows = await Recipe.findAll({
    where,
    include,
    limit,
    offset,
    distinct: true,
  });

  return {
    recipes: rows,
    pagination: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    },
  };
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
  // Verify and get categoryId from category name
  if (payload.category) {
    const categoryExists = await Category.findOne({
      where: { name: payload.category },
    });
    if (!categoryExists) {
      throw HttpError(400, `Category "${payload.category}" not found`);
    }
    payload.categoryId = categoryExists.id;
  }

  // Verify and get areaId from area name
  if (payload.area) {
    const areaExists = await Area.findOne({
      where: { name: payload.area },
    });
    if (!areaExists) {
      throw HttpError(400, `Area "${payload.area}" not found`);
    }
    payload.areaId = areaExists.id;
  }

  // Create recipe with generated ID
  const id = new ObjectId().toString();
  const newRecipe = await Recipe.create({
    id,
    title: payload.title,
    description: payload.description,
    instructions: payload.instructions,
    thumb: payload.thumb,
    time: payload.time,
    ownerId: payload.ownerId,
    categoryId: payload.categoryId,
    areaId: payload.areaId,
  });

  // Add ingredients if provided
  if (payload.ingredients && Array.isArray(payload.ingredients)) {
    const ingredientPromises = payload.ingredients.map(async (ingredientData) => {
      const ingredient = await Ingredient.findOne({
        where: { id: ingredientData.id },
      });

      if (!ingredient) {
        throw HttpError(400, `Ingredient with id "${ingredientData.id}" not found`);
      }

      return newRecipe.addIngredient(ingredient, {
        through: { measure: ingredientData.measure || '' },
      });
    });

    await Promise.all(ingredientPromises);
  }

  // Return recipe with all relations
  return await getRecipeById(newRecipe.id);
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
}

// async function removeFavoriteRecipe(where) {
//     const recipe = await getRecipeById(where);
//     if (!recipe) return null;

//     await recipe.update({ favorite: false });
//     return recipe;
// }

// Remove recipe from favorites
async function removeFavoriteRecipe(userId, recipeId) {
  const fav = await FavoriteRecipe.findOne({
    where: { userId, recipeId },
  });

  if (!fav) {
    return null;
  }

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
async function getFavoriteRecipes(userId) {
  return await Recipe.findAll({
    include: [
      {
        model: User,
        as: 'favoritedBy',
        where: { id: userId },
        attributes: [],
        through: { attributes: [] },
      },
    ],
  });
}

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
