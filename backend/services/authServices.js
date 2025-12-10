import { User, Recipe, Area, Category } from '../db/models/index.js';
// import Recipe from '../db/models/Recipe.js';
// import Category from '../db/models/Recipe.js';
// import Area from '../db/models/Area.js';
import bcrypt from 'bcrypt';
import HttpError from '../helpers/HttpError.js';
import gravatar from 'gravatar';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { ObjectId } from 'bson';

import { createToken } from '../helpers/jwt.js';

const { JWT_SECRET } = process.env;
const avatarsPath = path.resolve('public', 'avatars');

export const findUser = async (where) => {
  return User.findOne({ where });
};

export const registerUser = async (payload) => {
  const avatarURL = gravatar.url(payload.email);
  const id = new ObjectId().toString();
  const hashPassword = await bcrypt.hash(payload.password, 10);
  return User.create({ ...payload, password: hashPassword, avatarURL, id });
};

export const loginUser = async ({ password, email }) => {
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(401, 'Email or password invalid');
  }
  const passwordCompare = bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid');
  }

  const payload = {
    id: user.id,
  };

  const token = createToken(payload);
  console.log(token);

  await user.update({ token });
  return {
    token,
    email: user.email,
  };
};

export const refreshUser = async (user) => {
  const token = createToken({ id: user.id });
  const recipes = await Recipe.findAll({
    where: { ownerId: user.id },
    include: [
      { model: User, as: 'owner', attributes: ['id', 'name', 'email'] },
      { model: Category, as: 'category', attributes: ['id', 'name'] },
      { model: Area, as: 'area', attributes: ['id', 'name'] },
    ],
  });

  await user.update({ token });
  return {
    email: user.email,
    avatar: user.avatar,
    name: user.name,
    token,
    recipes,
  };
};

export const logoutUser = async (user) => {
  await user.update({ token: null });
  return true;
};

export const updateAvatar = async (user, file) => {
  let avatar = null;
  const newFile = path.join(avatarsPath, file.filename);
  await fs.rename(file.path, newFile);
  avatar = path.join('avatars', file.filename);

  await user.update({ avatarURL: avatar });

  return { avatarURL: avatar };
};
