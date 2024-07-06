const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register new User
// @access Public
// @route POST /api/user/register
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields must be required.");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("Email already exists.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (newUser) {
    res.status(201).json({
      message: "Register new User",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } else {
    res.status(500);
    throw new Error("Error registering new User.");
  }
});

// @desc Login user
// @access Public
// @route POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields must be required.");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate JWT Token
    const accessToken = jwt.sign(
      {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "5h" } // 5 hours token expiry
    );

    // Save the new token to the user's record
    user.token = accessToken;
    await user.save();
    
    res.status(400).json({
      message: "User logged in",
      id: user._id,
      username: user.username,
      email: user.email,
      token: accessToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password.");
  }
});

// @desc Get user profile
// access private
// @route POST /api/users/info

const getUserInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({ message: user });
});

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
};
