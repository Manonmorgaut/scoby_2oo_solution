const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Item = require("../models/Item");
const upload = require("../config/cloudinary");

router.patch("/me", upload.single("profileImg"), (req, res, next) => {
  const userId = req.session.currentUser._id;

  // If no file is sent, req.file is undefined, leading to an error when trying to
  // acces req.file.path (undefined.path) => Cannot read property path of undefined.
  if (req.file) {
    req.body.profileImg = req.file.path; // Add profileImage key to req.body
  }

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((userDocument) => {
      const userObj = userDocument.toObject();
      delete userObj.password;
      req.session.currentUser = userObj; // update the user in session.
      res.status(200).json(userObj);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

router.get("/me/items", (req, res, next) => {
  const currentUserId = req.session.currentUser._id; // We retrieve the users id from the session.
  // And then get all the items matching the id_user field that matches the logged in users id.
  Item.find({ id_user: currentUserId })
    .then((itemDocuments) => {
      res.status(200).json(itemDocuments);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
