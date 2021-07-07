const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator')

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @router GET api/profile/me
// @desc Testing Route
// @access Public

router.get('/me', auth, async (req, res) => {
  try {

  }catch(err) {
    console.error(err.message)
    res.send('Server Error')
  };
})

module.exports = router;

// @router POST api/profile
// @desc Post profile data
// @access Private

router.post('/', [auth],
[
  check('status', 'Status is required')
    .not()
    .isEmpty(),
  check('skills', 'Skills is required')
    .not()
    .isEmpty()
],

 async (req, res) => {

   // Variable takes errors from ValidationResult
   const errors = validationResult(req);

   //If there are errors, show a message
   if (!errors.isEmpty()){
     return res
       .status(400)
       .json({errors: errors.array() });
   }

  try {

    const {
    profileimage,
    bio,
    status,
    location,
    skills,
    work,
    website,
    githubusername
  } = req.body;




  }catch(err) {
    console.error(err.message)
    res.send('Server Error')
  };
})

module.exports = router;
