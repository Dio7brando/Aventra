const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

// Signup form =>
router.get("/signup", userController.renderSignupForm);

// SignUp route =>
router.post("/signup", wrapAsync(userController.signUp));

/* passport.authenticate hamara ek middleware hai jo authenticate krega mtlb identify
 krega ki user db mai already hai ya nahi */

// login form =>
router.get("/login", userController.renderLoginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.logIn,
);

// logout ke liye =>
router.get("/logout", userController.logOut);

module.exports = router;
