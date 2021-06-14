const express = require('express');
const router = express.Router();

// @router GET api/auth
// @desc Register User
// @access Public

router.post('/', (req, res) => {
  console.log(req.body);
  res.send('Users Registered');
});

// @router GET api/auth
// @desc Login User
// @access Public

router.get('/', (req, res) => res.send('Users Route'));

module.exports = router;
