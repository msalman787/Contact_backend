const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,  // reference user_id is required
      ref: "User"  // reference to User model by user_id field
    },
    name: {
      type: String,
      required: [true, "Please enter the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the contact email address"],
    },
    phone: {
      type: String,
      required: [true, "Please enter the contact phone number"],
    },
    image: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
