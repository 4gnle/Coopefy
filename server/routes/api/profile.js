const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const imageUpload = require('../../middleware/upload-image');
const fleekStorage = require('@fleekhq/fleek-storage-js');
const {check, validationResult} = require('express-validator')
const normalize = require('normalize-url');
const dotenv = require('dotenv');
dotenv.config();

const Profile = require('../../models/Profile');

// @router GET api/profile/me
// @desc Testing Route
// @access Public

router.get('/me', auth, async (req, res) => {
  try {

      const profile = await Profile.findOne({user: req.user.id})
      .populate('user', ['profilename']);

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
    const profileData = await Profile.find().populate('user', ["profilename", "username", "profileimage"]);

    res.json(profileData);

  }catch(err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  };
})

module.exports = router;

// @route    GET api/profile/:username
// @desc     Get profile by user username
// @access   Public
router.get(
  '/:username',
  async ({params: {username}}, res) => {
    try {
      const profile = await Profile.findOne({
        username: username
      }).populate('user', ['username','profilename', 'profileimage']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @router GET api/profile/:id
// @desc Get Username by ID
// @access Public
router.get('/id/:id', async ({params: {id}}, res) => {

  try {
    //Bring the user information
    const profile = await Profile.findOne({user: id}).populate('user', ['username']);

    res.json(profile.username)

  }catch(err){
    res.status(500).send('Server error')
    console.error(err.message)
  }
});

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
       : skills.split(',').map((skill) => skill.trim()) };

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

// @router GET api/profile/skills
// @desc GEt Profile Skills
// @access Private
router.get(
  '/skills', auth,
 async (req, res) => {
  try {
    let profile = await Profile.findOne(
      { user: req.user.id})

    if (profile.skills) {
      let profileskills = profile.skills
      res.send(profileskills);
    }

  } catch (err) {
    res.status(500).send({error: err.message });
  }
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

      const uploadedFile = await fleekStorage.upload({
      apiKey: process.env.API_KEY,
      apiSecret: process.env.API_SECRET,
      key: req.user.id,
      data: req.file.buffer,
      bucket:'angeljgomezc-team-bucket/profileimages',
      httpUploadProgressCallback: (event) => {
        console.log(Math.round(event.loaded/event.total*100)+ '% done');
      }
    });

      console.log(uploadedFile.publicUrl);

      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { profileimage: uploadedFile.publicUrl })

      res.send(profile.profileimage);

    } catch (err) {

      res.status(400).send({error: err.message })
        }
      }
    );

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
