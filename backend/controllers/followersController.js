import { addToFollowing } from '../services/followersServices.js';

export const addToFollowingController = async (req, res, next) => {
  const userId = req.user.id;
  const followUserId = req.params.id;

  if (userId === followUserId) {
    return res.status(400).json({ message: 'You cannot follow yourself' });
  }

  const newFollow = await addToFollowing(userId, followUserId);

  return res.status(201).json({
    message: 'Successfully followed the user',
    data: newFollow,
  });
};
