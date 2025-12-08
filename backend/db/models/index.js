import sequelize from "../sequelize.js";
import User from "./User.js";
import Recipe from "./Recipe.js";
import Ingredient from "./Ingredient.js";
import Category from "./Category.js";
import Area from "./Area.js";
import RecipeIngredient from "./RecipeIngredient.js";
import FavoriteRecipes from "./FavoriteRecipes.js";
import UserFollowers from "./UserFollowers.js";
import Testimonial from "./Testimonial.js";

User.hasMany(Recipe, { foreignKey: "ownerId", as: "recipes" });
User.hasMany(Testimonial, { foreignKey: "ownerId", as: "testimonials" });
User.belongsToMany(Recipe, { 
    through: FavoriteRecipes, 
    foreignKey: "userId",
    as: "favoriteRecipes" 
});
User.belongsToMany(User, {
    through: UserFollowers,
    as: "followers",
    foreignKey: "followingId",
    otherKey: "followerId"
});
User.belongsToMany(User, {
    through: UserFollowers,
    as: "following",
    foreignKey: "followerId",
    otherKey: "followingId"
});

Recipe.belongsTo(User, { foreignKey: "ownerId", as: "owner" });
Recipe.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Recipe.belongsTo(Area, { foreignKey: "areaId", as: "area" });
Recipe.belongsToMany(Ingredient, {
    through: RecipeIngredient,
    foreignKey: "recipeId",
    as: "ingredients"
});
Recipe.belongsToMany(User, {
    through: FavoriteRecipes,
    foreignKey: "recipeId",
    as: "favoritedBy"
});

Ingredient.belongsToMany(Recipe, {
    through: RecipeIngredient,
    foreignKey: "ingredientId",
    as: "recipes"
});

Category.hasMany(Recipe, { foreignKey: "categoryId", as: "recipes" });

Area.hasMany(Recipe, { foreignKey: "areaId", as: "recipes" });

Testimonial.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

// Синхронізація (тільки для розробки)
// У продакшені використовуйте міграції
const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("Database synchronized successfully");
    } catch (error) {
        console.error("Error synchronizing database:", error);
    }
};

export {
    User,
    Recipe,
    Ingredient,
    Category,
    Area,
    RecipeIngredient,
    FavoriteRecipes,
    UserFollowers,
    Testimonial,
    syncDatabase
};