const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

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
