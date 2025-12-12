import sequelize from './../db/sequelize.js';
import HttpError from '../helpers/HttpError.js';
import User from '../db/models/User.js';
import Recipe from '../db/models/Recipe.js';
import UserFollowers from '../db/models/UserFollowers.js';

export const findUser = async (where) => {
  return User.findOne({ where });
};

/**
 * Get data about user from DB
 *
 * - avatar
 * - name
 * - email
 * - count of recept
 * - count of favorites recept
 * - count of followers
 * - count of following
 *
 * @param {*} id - user ID
 */
export const getCurrentUser = async (id) => {
  const [results, metadata] = await sequelize.query(`
        SELECT 
            u.avatar avatar,
            u.name name,
            u.email email,
            COUNT(DISTINCT r.id) AS recipesCount,
            COUNT(DISTINCT fr."recipeId") AS favoritesCount,
            COUNT(DISTINCT uf1."followerId") AS followersCount,
            COUNT(DISTINCT uf2."followingId") AS followingCount
        FROM users u
        LEFT JOIN recipes r 
            ON r."ownerId"  = u.id
        LEFT JOIN "favoriteRecipes" fr 
            ON fr."userId"  = u.id
        LEFT JOIN "userFollowers" uf1 
            ON uf1."followingId"  = u.id      
        LEFT JOIN "userFollowers" uf2
            ON uf2."followerId"  = u.id
        where u.id = '${id}'
        GROUP BY 
            u.id, u.avatar, u.name, u.email`);

  if (results && results[0]) return results[0];
  return true; // need to fix
};

export const getUserById = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Recipe,
        as: 'recipes',
        attributes: ['id'],
        where: { ownerId: userId },
        required: false,
      },
    ],
  });

  const followerCount = await UserFollowers.count({ where: { followingId: userId } });

  if (!user) {
    throw HttpError(404, 'User not found');
  }
  return {
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    recipesCount: user.recipes.length,
    followersCount: followerCount,
  };
};
