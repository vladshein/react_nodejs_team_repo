import express from "express";
// TODO: update contacts to recipes
// import {
//     getAllContacts,
//     getOneContact,
//     deleteContact,
//     createContact,
//     updateContact,
//     updateStatusContact,
// } from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";

import { createRecipeSchema } from "../schemas/recipesSchemas.js";

import authenticate from "../middlewares/authenticate.js";

const recipesRouter = express.Router();

// public recipe routes
recipesRouter.get("/", getRecipes);
recipesRouter.get("/popular", getPopularRecipes);
recipesRouter.get("/:id", getRecipeById);

recipesRouter.use(authenticate);

recipesRouter.get("/my", getOwnRecipes);
recipesRouter.post("/", validateBody(createRecipeSchema), createRecipe);
recipesRouter.delete("/:id", deleteRecipe);

// Favorites
recipesRouter.get("/favorites", getFavoriteRecipes); // список улюблених
recipesRouter.post("/favorites/:id", updateFavoriteRecipe); // додати улюблений
recipesRouter.delete("/favorites/:id", removeFavoriteRecipe); // видалити з улюблених

export default recipesRouter;
