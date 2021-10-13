const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");

//Models
const Projects = require("../../models/Projects");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @router GET api/projects
// @desc Get all projects
// @access Public

router.get("/", async (req, res) => {
  try {
    const projectData = await Projects.find().populate("user", [
      "projectname",
      "projectdescription",
    ]);

    res.json(projectData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

// @router GET api/projects/:id
// @desc Get Project by ID
// @access Public

router.get("/:id", async ({ params: { id } }, res) => {
  try {
    const project = await Projects.findOne({
      _id: id,
    }).populate("projectowner", [
      "projectname",
      "projectdescription",
      "projectskills",
    ]);

    if (!project)
      return res.status(400).json({
        msg: "Project not found",
      });

    return res.json(project);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

// @router Post api/projects
// @desc Posting Projects
// @access Private

router.post(
  "/",
  auth,
  [
    check("projectname", "Name is required").not().isEmpty(),
    check("projectdescription", "Description is required").not().isEmpty(),
    check("projectskills", "Skills is required").not().isEmpty(),
  ],

  async (req, res) => {
    // Variable takes errors from ValidationResult
    const errors = validationResult(req);

    //If there are errors, show a message
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        projectname,
        projectdescription,
        projectlocation,
        projectduration,
        projectreward,
        projectamount,
        projectwebsite,
        projectskills,
      } = req.body;

      try {
        const newProject = new Projects({
          projectowner: req.user.id,
          projectname: projectname,
          projectdescription: projectdescription,
          projectlocation: projectlocation,
          projectduration: projectduration,
          projectreward: projectreward,
          projectamount: projectamount,
          projectwebsite:
            projectwebsite && projectwebsite !== ""
              ? normalize(projectwebsite, { forceHttps: true })
              : "",
          projectskills: Array.isArray(projectskills)
            ? projectskills
            : projectskills.split(",").map((skill) => skill.trim()),
        });

        const project = await newProject.save();
        return res.json(project);
      } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
      }
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

module.exports = router;

// @router Post api/projects/:id/apply
// @desc Application to Project
// @access Private

router.post(
  "/:id/apply",
  auth,
  [
    check("applicantname", "Name is required").not().isEmpty(),
    check("applicantusername", "Username is required").not().isEmpty(),
    check("application", "Application is required").not().isEmpty(),
  ],

  async (req, res) => {
    // Variable takes errors from ValidationResult
    const errors = validationResult(req);

    //If there are errors, show a message
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const project = await Projects.findById(req.params.id);

      //Check if User Already Sent an Application
      if (
        project.applications.filter(
          (application) => application.applicantid.toString() === req.user.id
        ).length > 0
      ) {
        return res.status(400).json({ msg: "You already sent an application" });
      }

      const {
        applicantname,
        applicantusername,
        application,
        applicationdate,
      } = req.body;

      //Create New Application
      const newApplication = {
        applicantid: req.user.id,
        applicantname: applicantname,
        applicantusername: applicantusername,
        application: application,
        applicationdate: applicationdate,
      };

      project.applications.unshift(newApplication);

      await project.save();

      res.json(project.applications);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

// @router GET api/projects/:id/applications
// @desc Get Project Applications
// @access Public
router.get(
  '/:id/applications',
   async ({params: {id}}, res) => {

  try {
    let project = await Projects.findOne(
      { _id: id})

    if (project.applications) {
      let applications = project.applications
      res.send(applications);
    }

  } catch (err) {
    res.status(500).send({error: err.message });
  }
});

module.exports = router;
