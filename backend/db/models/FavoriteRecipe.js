import sequelize from "../sequelize.js";

const FavoriteRecipes = sequelize.define("favoriteRecipes", {
    userId: {
        primaryKey: true,
        references: {
            model: "users",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    recipeId: {
        primaryKey: true,
        references: {
            model: "recipes",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
});

export default FavoriteRecipes;
