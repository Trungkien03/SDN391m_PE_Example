const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  try {
    const { jwt: accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(403).json({
        message: 'Fail to get all courses, user is not logged in',
      });
    }

    const decode = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(403).json({
        message: 'Access Token is not valid!',
      });
    }

    req.user = decode;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = validateJWT;
