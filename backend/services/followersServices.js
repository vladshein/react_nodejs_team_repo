import { ObjectId } from 'bson';
import UserFollowers from '../db/models/UserFollowers.js';
import HttpError from '../helpers/HttpError.js';

export const addToFollowing = async (userId, followUserId) => {
  try {
    const existingFollow = await UserFollowers.findOne({
      where: {
        followerId: userId,
        followingId: followUserId,
      },
    });
    if (existingFollow) {
      throw HttpError(409, 'You are already following this user');
    }

    const newFollow = await UserFollowers.create({
      id: new ObjectId().toString(),
      followerId: userId,
      followingId: followUserId,
    });

    return newFollow;
  } catch (error) {
    throw error;
  }
};
