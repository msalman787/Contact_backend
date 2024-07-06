const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  createContact,
  getContactById,
  deleteContactById,
  updateContactById,
} = require("../controllers/contact.ts");
const validateTokenHandler = require("../middleware/validateToken.ts")
const upload = require('../helper/upload.ts')

router.use(validateTokenHandler)

// Get all contacts
router.route("/").get(getAllContacts);
// Create contact
router.route("/create").post(upload.single('file'),createContact);
// Get contact by id
router.route("/:id").get(getContactById).put(updateContactById).delete(deleteContactById);

module.exports = router;
