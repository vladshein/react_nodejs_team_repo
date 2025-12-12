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

// public recipe routes (specific routes must be before /:id pattern)
recipesRouter.get('/', getRecipesController);
recipesRouter.get('/popular', getPopularRecipesController);

// protected routes - must be defined BEFORE /:id to avoid route collision
recipesRouter.get(
  '/my',
  [authenticate, validatePaginator(paginationSchema)],
  getOwnRecipesController
);

// Favorites routes - GET must be before POST/DELETE with :id parameter
recipesRouter.get('/favorites', authenticate, getFavoriteRecipesController); // список улюблених
recipesRouter.post('/favorites/:id', authenticate, updateFavoriteRecipeController); // додати улюблений
recipesRouter.delete('/favorites/:id', authenticate, removeFavoriteRecipeController); // видалити з улюблених

// public route with dynamic parameter - must be AFTER specific routes
recipesRouter.get('/:id', getRecipeByIdController);

// protected recipe CRUD
recipesRouter.post('/', [authenticate, validateBody(createRecipeSchema)], createRecipeController);
recipesRouter.delete('/:id', authenticate, deleteRecipeController);

export default recipesRouter;
