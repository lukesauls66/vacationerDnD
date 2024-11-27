const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// router.post("/check-username", async (req, res) => {
//   const { username } = req.body;

//   const existingUser = await User.findOne({ username: username });

//   if (existingUser) {
//     return res.status(400).json({ message: "Username already taken" });
//   } else {
//     return res.status(200).json({ message: "Username avaliable" });
//   }
// });

// router.post("/check-email", async (req, res) => {
//   const { email } = req.body;

//   const existingUser = await User.findOne({ email: email });

//   if (existingUser) {
//     return res.status(400).json({ message: "Email already taken" });
//   } else {
//     return res.status(200).json({ message: "Email avaliable" });
//   }
// });

const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("First name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("Last name is required"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Username is required with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

router.post("/signup", validateSignup, async (req, res) => {
  try {
    const { firstName, lastName, email, password, username } = req.body;

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(409).json({
        title: "Bad request.",
        message: "Bad request.",
        errors: { username: "Username must be unique" },
      });
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      hashedPassword,
    });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser,
    });
  } catch (err) {
    if (err.message) {
      return res.status(400).json({
        title: "Bad request.",
        message: "Bad request.",
        errors: err.message,
      });
    }
    return res.status(500).json({
      message: "User already exists",
      errors: err,
    });
  }
});

router.post("/", async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    firstName,
    lastName,
    email,
    username,
    hashedPassword,
  });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

module.exports = router;
