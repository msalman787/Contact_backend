const express = require("express");
const router = express.Router();
const {
  singleFileUpload,
} = require("../controllers/file.ts");
const validateTokenHandler = require("../middleware/validateToken.ts")
const upload = require('../helper/upload.ts')

router.use(validateTokenHandler)

// Upload file
router.route("/single-file").post(upload.single('file'),singleFileUpload);

module.exports = router;
