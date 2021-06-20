const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User')

// @router GET api/auth
// @desc Login User
// @access Public

router.get('/', auth, async (req, res) => {
  try {
    //Bring the user information
    const user = await User.findById(req.user.id).select('-password');

    //Send it as a response
    res.json(user)

  }catch(err){
    res.status(500).send('Server error')
    console.error(err.message)
  }
});

//@router POST api/auth
//@desc Auth User & token
//@access Public

router.post('/', [
  check('email', 'Write a valid email').isEmail(),
  check('password', 'Write a valid password').exists()
], async (req, res) => {

  // Variable takes errors from ValidationResult
  const errors = validationResult(req);

  //If there are errors, show a message
  if (!errors.isEmpty()){
    return res
      .status(400)
      .json({errors: errors.array() });
  }

  // This breaks down the req.body (data received)
  const {email, password} = req.body;

  try {
    // Finding registered emails
    let user = await User.findOne({email});

    if (!user) {
      return  res
        .status(400)
        .json({ errors: [{msg: 'Invalid Credentials'}]})
    }

    //Validating the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return  res
        .status(401)
        .json({ errors: [{msg: 'Invalid Credentials'}]})
    };

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

    // console.log(req.body);
    // res.send('User Registered');

  } catch(err) {

    console.log(err.message);
    res.status(500).send('Auth error');
  }
});

module.exports = router;
