const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator')
const normalize = require('normalize-url');

//Models
const Projects = require('../../models/Projects');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @router GET api/projects
// @desc Get all projects
// @access Public

router.get('/', async (req, res) => {

  try {
    const projectData = await Projects.find().populate('user', ["projectname", "projectdescription"]);

    res.json(projectData);

  }catch(err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  };
})

module.exports = router;

// @router Post api/projects
// @desc Posting Projects
// @access Private

router.post('/', auth,
[
  check('projectname', 'Name is required')
    .not()
    .isEmpty(),
  check('projectdescription', 'Description is required')
    .not()
    .isEmpty(),
  check('projectskills', 'Skills is required')
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
    projectname,
    projectdescription,
    projectlocation,
    projectreward,
    projectamount,
    projectwebsite,
    projectskills
   } = req.body;

   try {
     const newProject = new Projects({
       projectowner: req.user.id,
       projectname: projectname,
       projectdescription: projectdescription,
       projectlocation: projectlocation,
       projectreward: projectreward,
       projectamount: projectamount,
       projectwebsite:
         projectwebsite && projectwebsite !== ''
           ? normalize(projectwebsite, { forceHttps: true })
           : '',
       projectskills: Array.isArray(projectskills)
         ? projectskills
         : projectskills.split(',').map((skill) => skill.trim())
     })

    const project = await newProject.save();
     return res.json(project);

   } catch (err) {
     console.error(err.message);
     return res.status(500).send('Server Error');
   }

  }catch(err) {
    console.error(err.message)
    res.send('Server Error')
  };
});

module.exports = router;
