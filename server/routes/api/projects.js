const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator')
const normalize = require('normalize-url');

// @router GET api/projects
// @desc Testing Route
// @access Public

router.get('/', (req, res) => res.send('Projects Route'));

// @router Post api/projects
// @desc Posting Projects
// @access Private

router.post('/', (req, res) => res.send('Projects Route'));

module.exports = router;
