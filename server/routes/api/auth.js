const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/Users')

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

module.exports = router;
