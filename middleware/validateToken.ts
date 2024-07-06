const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to validate JWT token
const validateTokenHandler = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.user.id);

      if (!user || user.token !== token) {
        res.status(401);
        throw new Error("Invalid or expired token.");
      }

      console.log("User is authorized", decoded);
      req.user = decoded.user;
      next();
    } catch (err) {
      console.log({ err });
      res.status(401);
      throw new Error(err.message);
    }
  } else {
    console.log("No token, sending 401");
    res.status(401);
    throw new Error("Not authorized, token is required");
  }
});

module.exports = validateTokenHandler;
