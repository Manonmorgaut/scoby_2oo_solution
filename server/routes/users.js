const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Item = require("../models/Item");
const upload = require("../config/cloudinary");
router.get("/me", (req, res, next) => {});

router.patch("/", upload.single("profileImg"), (req, res, next) => {
  const userId = req.session.currentUser._id;
  if (req.file) {
    req.body.profileImg = req.file.secure_url;
  }

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((userDocument) => {
      const userObj = userDocument.toObject();
      delete userObj.password;
      req.session.currentUser = userObj;
      res.status(200).json(userObj);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/items", (req, res, next) => {
  const currentUserId = req.session.currentUser._id;
  Item.find({ id_user: currentUserId })
    .then((itemDocuments) => {
      res.status(200).json(itemDocuments);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
