import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const FavoriteRecipes = sequelize.define(
    "favoriteRecipe",
    {
        userId: {
            type: DataTypes.TEXT,
            primaryKey: true,
            references: {
                model: "users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        recipeId: {
            type: DataTypes.TEXT,
            primaryKey: true,
            references: {
                model: "recipes",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
    },
    {
        timestamps: true,
    }
);

export default FavoriteRecipes;
