const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const { check, oneOf, validationResult } = require("express-validator");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// const { OAuth2Client } = require('google-auth-library')
// const client = new OAuth2Client(process.env.CLIENT_ID)

const User = require("../../models/User");

// @router GET api/auth
// @desc Login User
// @access Public

router.get("/", auth, async (req, res) => {
  try {
    //Bring the user information
    const user = await User.findById(req.user.id).select("-password");

    //Send it as a response
    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
    console.error(err.message);
  }
});

//@router POST api/v1/auth/google
//@desc Auth User & Token from Google
//@access Public

// router.post("/google", async (req, res) => {
//
//   try {
//     const { token }  = req.body
//     const ticket = await client.verifyIdToken({
//           idToken: token,
//           audience: process.env.CLIENT_ID
//       });
//
//       const { email } = ticket.getPayload();
//       const user = await db.user.upsert({
//           where: { email: email }
//       })
//       res.status(201)
//       res.json(user)
//   } catch (err) {
//     res.status(500).send('Server error')
//     console.error(err.message)
//   }
//
// })

//@router POST api/auth/MT
//@desc Auth User & Token via Metamask
//@access public
router.post(
  "/metamask",
  [check("publicAddress", "This is not a valid Ethereum address").exists(),
  check('signature', "The signature is not valid").exists()],
  async (req, res) => {

    const {publicAddress, signature} = req.body;

    let user = await User.findOne({publicAddress: publicAddress})

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: `Invalid Address, ${publicAddress} is not in database` }] });
    }

    try {

				const msg = `I am signing my one-time nonce: ${user.nonce}`;

				const msgBufferHex = await bufferToHex(Buffer.from(msg, 'utf8'));

				await const address = await recoverPersonalSignature({
					data: msgBufferHex,
					sig: signature,
				});

				if (address.toLowerCase() === publicAddress.toLowerCase()) {
					return user;
				} else {
					res.status(401).send({
						error: 'Signature verification failed',
					});

        const payload = {
          user: {
            id: user.id,
            publicAddress
          },
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );

    } catch (e) {

    }
  }
);

//@router POST api/auth
//@desc Auth User & token
//@access Public

const validateLogin = [
  oneOf([
    check("email", "Write a valid email or username").isEmail(),
    check("username", "Write a valid email or username")
      .exists()
      .isLength({ min: 3 }),
  ]),
];

router.post(
  "/",
  validateLogin,
  [check("password", "Write a valid password").exists()],
  async (req, res) => {
    // Variable takes errors from ValidationResult
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // This breaks down the req.body (data received)
    const { username, email, password } = req.body;

    try {
      // Finding registered emails or usernames

      let user = await User.findOne({ $or: [{ email }, { username }] });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      //Validating the password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Bringing the USER.ID as payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      //Sending the JWT token
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      user.nonce = Math.floor(Math.random() * 10000);
			return user.save();

    } catch (err) {
      console.log(err.message);
      res.status(500).send("Auth error");
    }
  }
);

module.exports = router;
