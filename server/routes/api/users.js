const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User')

// @router GET api/users
// @desc Register User
// @access Public

router.post('/', [
  check('username', 'Name is required').not().isEmpty(),
  check('email', 'Write a valid email').isEmail(),
  check('password', 'You need a secure password (more than 8 characters)').isLength({ min: 8})
], async (req, res) => {

  // Variable takes errors from ValidationResult
  const errors = validationResult(req);

  //If there are errors, show a message
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() });
  }

  // This breaks down the req.body (data received)
  const {username, email, password} = req.body;

  try {
    // Finding registered emails
    let user = await User.findOne({email})
    if (user) {
      return  res.status(400).json({ errors: [{msg: 'Email is already registered'}]})
    }

    // Breaking down user
    user = new User({
      username,
      email,
      password
    });

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Bringing the USER.ID as payload
    const payload = {
      user: {
        id: user.id
      }
    };

    //Sending the JWT token
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {expiresIn: 360000},
      (err, token) => {
      if(err) throw err;
      res.json({ token })
    });

    console.log(req.body);
    // res.send('User Registered');

  } catch(err) {

    console.log(err.message);
    res.status(500).send('Registering Error');
  }
});

// @router GET api/auth
// @desc Login User
// @access Public

router.get('/', (req, res) => res.send('Users Route'));

module.exports = router;
