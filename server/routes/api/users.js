const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/Users')

// @router GET api/auth
// @desc Register User
// @access Public

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Write a valid email').isEmail(),
  check('password', 'You need a secure password (more than 8 characters)').isLength({ min: 8})
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() });
  }

  // This breaks down the req.body (data received)
  const {name, email, password} = req.body;

  try {
    // Finding registered emails
    let user = await User.findOne({email})
    if (user) {
      return  res.status(400).json({ errors: [{msg: 'Email is already registered'}]})
    }

    // Hashing passwords
    user = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    //Sending the JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

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
