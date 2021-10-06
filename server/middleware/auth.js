const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function(req, res, next) {
  //Read the token from the header
  const token = req.header('x-auth-token');

  //Check if there's a token
  if (!token) {
    return res.status(401).json({msg: 'No token. Auth Denied.'})
  }

  //Verify the token to LOG IN
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();

  } catch(err) {
    return res.status(401).json({ msg: 'Token invalid. Auth Denied.'})
  }
}
