import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const RecipeIngredient = sequelize.define("recipeIngredient", {
    recipeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "recipes",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    ingredientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "ingredients",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    measure: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default RecipeIngredient;