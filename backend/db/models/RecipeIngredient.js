import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

// join table for ingredients
const RecipeIngredient = sequelize.define("recipeIngredient", {
    recipeId: {
        primaryKey: true,
        references: {
            model: "recipes",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    ingredientId: {
        primaryKey: true,
        references: {
            model: "ingredients",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    measure: { type: DataTypes.STRING },
});

export default RecipeIngredient;
