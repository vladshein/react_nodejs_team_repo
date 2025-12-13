import * as service from '../services/userServices.js';

/**
 * Get information about current user
 *
 * @param {*} req
 * @param {*} res
 */
export const getCurrentUser = async (req, res) => {
  const { id } = req.user;
  // const result = await service.getCurrentUser(id);
  const result = await service.getCurrentUserInfo(id);
  res.json(result);
};

/**
 * Get info by user ID
 *
 * @param {*} req
 * @param {*} res
 */
export const getUserById = async (req, res) => {
  const { userId } = req.params;
  const result = await service.getUserById(userId);
  res.json(result);
};
