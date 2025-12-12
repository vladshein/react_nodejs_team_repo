import express from 'express';
import {
  getRecipesController,
  getPopularRecipesController,
  getRecipeByIdController,
  getOwnRecipesController,
  createRecipeController,
  deleteRecipeController,
  getFavoriteRecipesController,
  updateFavoriteRecipeController,
  removeFavoriteRecipeController,
} from '../controllers/recipesControllers.js';
import { validateBody, validateQuery, validateParams } from '../helpers/validateFunctions.js';
import {
  createRecipeSchema,
  paginationSchema,
  deleteRecipeSchema,
} from '../schemas/recipesSchemas.js';
import authenticate from '../middlewares/authenticate.js';

const recipesRouter = express.Router();

// public recipe routes
recipesRouter.get('/', getRecipesController);
recipesRouter.get('/favorites', authenticate, getFavoriteRecipesController);
recipesRouter.get('/popular', getPopularRecipesController);
recipesRouter.get('/my', [authenticate, validateQuery(paginationSchema)], getOwnRecipesController);
recipesRouter.get('/:id', getRecipeByIdController);
recipesRouter.post('/', [authenticate, validateBody(createRecipeSchema)], createRecipeController);
recipesRouter.delete(
  '/:id',
  [authenticate, validateParams(deleteRecipeSchema)],
  deleteRecipeController
);

// Favorites
recipesRouter.post('/favorites/:id', updateFavoriteRecipeController); // додати улюблений
recipesRouter.delete('/favorites/:id', removeFavoriteRecipeController); // видалити з улюблених

export default recipesRouter;
