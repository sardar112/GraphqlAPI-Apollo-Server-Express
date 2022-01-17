const jwt = require('jsonwebtoken');

module.exports.verifyUser = async (req) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.id = decoded.id;
    }
  } catch (err) {
    throw new Error(err);
  }
};
