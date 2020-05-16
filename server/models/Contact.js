const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  id_user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  email: String,
  phoneNumber: String,
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
