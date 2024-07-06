const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel.js");

// @desc Single file upload to cloudinary storage
// @access Private
// @route POST /api/upload/file
const singleFileUpload = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone && !req.file && !req.file.path) {
    res.status(400);
    throw new Error("All fields must be required.");
  }
  const existingContact = await Contact.findOne({ email });
  if (existingContact) {
    res.status(400);
    throw new Error("Email already exists.");
  }
  
  const newContact = await Contact.create({
    user_id: req.user.id,
    name,
    email,
    phone,
    image: req.file.path, // The URL to access the uploaded image
  });

  res.status(201).json({ message: "Create new contact", contact: newContact });
});

module.exports = {
  singleFileUpload,
};
