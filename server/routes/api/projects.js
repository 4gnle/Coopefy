const express = require('express');
const router = express.Router();

// @router GET api/projects
// @desc Testing Route
// @access Public

router.get('/', (req, res) => res.send('Projects Route'));

module.exports = router;
