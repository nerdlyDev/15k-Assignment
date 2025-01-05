const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {

  const token = req.header('Authorization')?.replace('Bearer ', '').trim();

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

  
    next();
  } catch (error) {
  
    res.status(401).json({ message: 'Invalid Token', error: error.message });
  }
};

module.exports = authMiddleware;
