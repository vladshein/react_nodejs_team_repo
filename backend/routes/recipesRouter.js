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

import { createRecipeSchema } from '../schemas/recipesSchemas.js';

import authenticate from '../middlewares/authenticate.js';

const recipesRouter = express.Router();

// public recipe routes
recipesRouter.get('/', getRecipesController);
recipesRouter.get('/favorites', authenticate, getFavoriteRecipesController);
recipesRouter.get('/:id', getRecipeByIdController);
recipesRouter.get('/popular', getPopularRecipesController);

recipesRouter.use(authenticate);

recipesRouter.get('/my', getOwnRecipesController);
recipesRouter.post('/', validateBody(createRecipeSchema), createRecipeController);
recipesRouter.delete('/:id', deleteRecipeController);

// Favorites
// recipesRouter.get("/favorites", getFavoriteRecipesController);
recipesRouter.patch('/favorites/:id', updateFavoriteRecipeController);
recipesRouter.delete('/favorites/:id', removeFavoriteRecipeController);

export default recipesRouter;
