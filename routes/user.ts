const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getUserInfo,
} = require("../controllers/user.ts");
const validateTokenHandler = require("../middleware/validateToken.ts");

// Register User
router.route("/register").post(registerUser);

// Login User
router.route("/login").post(loginUser);

// Register User
router.get("/info",validateTokenHandler, getUserInfo);

module.exports = router;
