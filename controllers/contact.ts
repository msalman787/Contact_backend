const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel.js");

// @desc Create new contact
// @access Private
// @route POST /api/contacts/create
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
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

// @desc Get all contacts
// @access Private
// @route GET /api/contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ contacts });
});

// @desc Get contact by Id
// @access Private
// @route GET /api/contacts/:id
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found.");
  }
  res.status(200).json({ contact });
});

// @desc UPDATE contact by Id
// @access Private
// @route PUT /api/contacts/:id
const updateContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found.");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other contacts.");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

// @desc DELETE contact by Id
// @access Private
// @route DELETE /api/contacts/:id
const deleteContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found.");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete other contacts.");
  }

  await contact.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Contact deleted successfully.", contact });
});

module.exports = {
  getAllContacts,
  createContact,
  getContactById,
  deleteContactById,
  updateContactById,
};
