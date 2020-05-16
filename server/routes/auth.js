const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/signin", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((userDocument) => {
    if (!userDocument) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isValidPassword = bcrypt.compareSync(password, userDocument.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const userObj = userDocument.toObject();  // Mongoose documents are immutable, we have to transform it into an object
                                              // in order to remove / add fields to it.
    delete userObj.password;  // Remove password from object before sending to the front end.                  
    req.session.currentUser = userObj;
    res.status(200).json(userObj);
  });
});

const salt = 10;

router.post("/signup", (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  User.findOne({ email }).then((userDocument) => {
    if (userDocument) {
      return res.status(400).json({ message: "Email taken" });
    }

    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = { email, lastName, firstName, password: hashedPassword };

    User.create(newUser).then((newUserDocument) => {
      const userObj = newUserDocument.toObject(); // Mongoose documents are immutable, we have to transform it into an object
                                                  // in order to remove / add fields to it.
      delete userObj.password; // Remove password from object before sending to the front end.
      req.session.currentUser = userObj;
      res.status(201).json(userObj);
    });
  });
});

router.get("/isLoggedIn", (req, res, next) => {
  if (req.session.currentUser) {
    return res.status(200).json(req.session.currentUser);
  }
  res.status(401).json({ message: "Unauthorized" });
});

module.exports = router;
