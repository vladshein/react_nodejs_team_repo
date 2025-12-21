import HttpError from '../helpers/HttpError.js';
import { verifyToken } from '../helpers/jwt.js';
import { findUser } from '../services/authServices.js';

const authenticate = async (req, res, next) => {
  next();
};

export default authenticate;
