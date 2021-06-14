const express = require('express');
const router = express.Router();

// @router GET api/auth
// @desc Login User
// @access Public

router.get('/', (req, res) => res.send('Auth Route'));

module.exports = router;
