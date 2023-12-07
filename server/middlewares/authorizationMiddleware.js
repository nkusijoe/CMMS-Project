const authorizeUser = (requiredRole) => async (req, res, next) => {
  try {
    if (req.user.role !== requiredRole) {
      throw new Error();
    }
    next();
  } catch (error) {
    res.status(403).send({ error: 'Access forbidden.' });
  }
};

module.exports = authorizeUser;
