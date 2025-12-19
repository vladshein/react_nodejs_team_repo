import { Recipe, User, FavoriteRecipe, UserFollowers } from '../db/models/index.js';
import { fn, col } from 'sequelize';
import HttpError from '../helpers/HttpError.js';

/**
 * function with universal where statement
 *
 * @param {*} where
 * @returns
 */
export const findUser = async (where) => {
  return User.findOne({ where });
};

/**
 * Current user information
 *
 * @param {*} userId
 * @returns
 */
export const getCurrentUserInfo = async (userId) => {
  //
  return await User.findOne({
    where: { id: userId },

    attributes: [
      'id',
      'avatar',
      'name',
      'email',
      [fn('COUNT', fn('DISTINCT', col('recipesHas.id'))), 'count_user_recipes'],
      [fn('COUNT', fn('DISTINCT', col('favoriteRecipesHas.recipeId'))), 'count_favorite_recipes'],
      [fn('COUNT', fn('DISTINCT', col('followersHas.followerId'))), 'count_followers'],
      [fn('COUNT', fn('DISTINCT', col('followingHas.followingId'))), 'count_following'],
    ],

    include: [
      {
        model: Recipe,
        as: 'recipesHas',
        attributes: [],
        required: false, // LEFT JOIN
      },
      {
        model: FavoriteRecipe,
        as: 'favoriteRecipesHas',
        attributes: [],
        required: false,
      },
      {
        model: UserFollowers,
        as: 'followersHas', // uf1 — users who follow this user
        attributes: [],
        required: false,
      },
      {
        model: UserFollowers,
        as: 'followingHas', // uf2 — users this user follows
        attributes: [],
        required: false,
      },
    ],

    group: ['user.id', 'user.avatar', 'user.name', 'user.email'],
  });
};

/**
 * Get user by ID
 *
 * @param {*} userId
 * @returns
 */
export const getUserById = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Recipe,
        as: 'recipesHas',
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
    recipesCount: user.recipesHas.length,
    followersCount: followerCount,
  };
};

export const getFollowingsList = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [
      {
        model: User,
        as: 'following',
        attributes: ['id', 'name', 'email', 'avatar'],
        through: { attributes: [] },
        include: [
          {
            model: Recipe,
            as: 'recipesHas',
            attributes: ['id', 'title', 'thumb'],
            limit: 4,
          },
        ],
      },
    ],
  });

  return user ? user.following : [];
};

export const getFollowersList = async (userId) => {
  // Використовуємо findByPk, щоб знайти конкретного користувача та його підписників
  const user = await User.findByPk(userId, {
    include: [
      {
        model: User,
        as: 'followers', // Має збігатися з асоціацією belongsToMany у вашому файлі
        attributes: ['id', 'name', 'email', 'avatar'],
        through: { attributes: [] },
        include: [
          {
            model: Recipe,
            as: 'recipesHas', // У вашому коді User.hasMany(Recipe) має саме такий аліас
            attributes: ['id', 'title', 'thumb'],
            limit: 4,
          },
        ],
      },
    ],
  });

  return user ? user.followers : [];
};
