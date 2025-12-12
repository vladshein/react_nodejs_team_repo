import { getFollowingsList } from '../services/followersServices.js';
import * as service from '../services/userServices.js';

/**
 * Get information about current user
 *
 * @param {*} req
 * @param {*} res
 */
export const getCurrentUser = async (req, res) => {
  const { id } = req.user;
  const result = await service.getCurrentUser(id);
  res.json(result);
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  const result = await service.getUserById(userId);
  res.json(result);
};
