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
import validateBody from '../helpers/validateBody.js';
import { validatePaginator } from './../middlewares/validatePaginator.js';
import { createRecipeSchema, paginationSchema } from '../schemas/recipesSchemas.js';

import authenticate from '../middlewares/authenticate.js';

const recipesRouter = express.Router();

// public recipe routes
recipesRouter.get('/', getRecipesController);
recipesRouter.get('/favorites', getFavoriteRecipesController); // список улюблених
recipesRouter.get('/popular', getPopularRecipesController);
recipesRouter.get(
  '/my',
  [authenticate, validatePaginator(paginationSchema)],
  getOwnRecipesController
);
recipesRouter.get('/:id', getRecipeByIdController);
recipesRouter.post('/', [authenticate, validateBody(createRecipeSchema)], createRecipeController);
recipesRouter.delete('/:id', authenticate, deleteRecipeController);

// Favorites
recipesRouter.post('/favorites/:id', updateFavoriteRecipeController); // додати улюблений
recipesRouter.delete('/favorites/:id', removeFavoriteRecipeController); // видалити з улюблених

export default recipesRouter;
