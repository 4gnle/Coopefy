const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const imageUpload = require('../../middleware/upload-image');
const {check, validationResult} = require('express-validator')
const normalize = require('normalize-url');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @router GET api/profile/me
// @desc Testing Route
// @access Public

router.get('/me', auth, async (req, res) => {
  try {

      const profile = await Profile.findOne({user: req.user.id})
      .populate('user',['name']);

      if(!profile) {

        return res.status(400).json({ msg: 'There is no profile for this user'});

      }

      res.json(profile);

    } catch (err) {

      console.error(err.message);
      res.status(500).send('Server Error');

    }
})

module.exports = router;

// @router GET api/profile
// @desc Get All Profiles
// @access Public

router.get('/', async (req, res) => {

  try {
    const profileData = await Profile.find().populate('user', ['name', 'profileimage']);

  }catch(err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  };
})

module.exports = router;

// @router GET api/profile/me
// @desc Get Profile by Username
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
  check('profilename', 'Name is required')
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
    status,
    profilename,
    website,
    location,
    bio } = req.body;

  // build a profile
   const profileFields = {
     user: req.user.id,
     status: status,
     website:
       website && website !== ''
         ? normalize(website, { forceHttps: true })
         : '',
    profilename: profilename,
    location: location,
    bio: bio   };

   try {
     // Using upsert option (creates new doc if no match is found):
     let profile = await Profile.findOneAndUpdate(
       { user: req.user.id },
       { $set: profileFields },
       { new: true, upsert: true, setDefaultsOnInsert: true }
     );
     return res.json(profile);
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

// @router POST api/profile
// @desc Post profile data
// @access Private

router.post('/skills', [auth],
[
  check('skills', 'Skills are required')
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
    skills} = req.body;

  // build a profile
   const profileSkills = {
     user: req.user.id,
     skills: Array.isArray(skills)
       ? skills
       : skills.split(' ').map((skill) => skill.trim()) };

   try {
     // Using upsert option (creates new doc if no match is found):
     let profile = await Profile.findOneAndUpdate(
       { user: req.user.id },
       { $set: profileSkills },
       { new: true, upsert: true, setDefaultsOnInsert: true }
     );
     return res.json(profile);
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


//@route POST api/profile/links
//@desc Post profile Socials
//@access Private
router.post('/links', [auth],

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
    twitter,
    facebook,
    instagram,
    youtube,
    linkedin,
    behance,
    dribbble,
    producthunt,
    github,
    ...rest
  } = req.body;

  // build a profile
   const linkFields = {
     user: req.user.id,
     ...rest
   }

   const fieldLinks = { youtube, twitter, instagram, linkedin, facebook, github, behance, dribbble, producthunt};
   linkFields.sociallinks = fieldLinks;

   try {
     // Using upsert option (creates new doc if no match is found):
     let profile = await Profile.findOneAndUpdate(
       { user: req.user.id },
       { $set: linkFields },
       { new: true, upsert: true, setDefaultsOnInsert: true }
     );
     return res.json(profile);
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

//@route POST api/profile/image
//@desc  Posts an image in database
//@access Private
  router.post('/image', auth, imageUpload.single('profileimage'),

  async (req, res) => {

    try {

      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { profileimage: req.file.buffer })

      await profile.save();

      res.send(profile);

    } catch (err) {

      res.status(400).send({error: err.message })
        }
      }
    );

// @route    GET api/profile image by user ID
// @desc     Get the profile image by ID
// @access   Public
router.get(
  '/image', auth,
 async (req, res) => {
  try {
    let profile = await Profile.findOne(
      { user: req.user.id})

    let profileimage = profile.profileimage

    res.set('Content-Type', 'image/jpeg').send(profileimage);

  } catch (err) {
    res.status(500).send({error: err.message });
  }
});

  // @router  DELETE api/profile/image
  // @desc    DELETE Profile Image
  // @access  Private
  router.delete('/image', auth, async (req, res) => {

    try {
      // @todo Remove user image
      //Remove Profile image
      let profileFind = await Profile.findOne({ user: req.user.id });

      profileFind.profileimage = undefined

      await profileFind.save();

      res.send({msg: 'Image Has Been Removed'});

    }catch(err) {
      res.status(500).send({error: err.message });
    }

  });
