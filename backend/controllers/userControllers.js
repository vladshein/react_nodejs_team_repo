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
