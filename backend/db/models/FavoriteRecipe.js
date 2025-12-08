import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const FavoriteRecipes = sequelize.define("favoriteRecipe", {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "users",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
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
}, {
    timestamps: true, // для відстеження коли додано в улюблене
});

export default FavoriteRecipes;