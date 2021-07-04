const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  //Read the token from the header
  const token = req.header('x-auth-token');

  //Check if there's a token
  if (!token) {
    return res.status(400).json({msg: 'No token. Auth Denied.'})
  }

  //Verify the token to LOG IN
  try {
  jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
    if (error) {
      return res.status(401).json({ msg: 'Token is not valid' });
    } else {
      req.user = decoded.user;
      next();
    }
  });
} catch (err) {
  console.error('something wrong with auth middleware');
  res.status(500).json({ msg: 'Server Error' });
}
};
//   try {
//     const decoded = jwt.verify(token, config.get('jwtSecret'));
//
//     req.user = decoded.user;
//     next();
//
//   } catch(err) {
//     return res.status(401).json({ msg: 'Token invalid. Auth Denied.'})
//   }
// }
