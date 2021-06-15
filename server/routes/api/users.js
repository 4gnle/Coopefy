const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')

// @router GET api/auth
// @desc Register User
// @access Public

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Write a valid email').isEmail(),
  check('password', 'You need a secure password (more than 8 characters)').isLength({ min: 8})
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() });
  }

  console.log(req.body);
  res.send('Users Registered');
});

// @router GET api/auth
// @desc Login User
// @access Public

router.get('/', (req, res) => res.send('Users Route'));

module.exports = router;
