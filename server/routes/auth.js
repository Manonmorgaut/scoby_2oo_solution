const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // package that allows us to securely encrypt user password.
const User = require("../models/User"); 
const salt = 10; // Salt for bcrypt's hashing algorithm

router.post("/signin", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((userDocument) => {
    if (!userDocument) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isValidPassword = bcrypt.compareSync(password, userDocument.password); // Will send back a boolean if password sent in req.body doesnt 
    //match userDocument's password.
    // => If it doesnt match (false) send an error message 
    // => If it matchs, the email & password are valid, set the user in the session.
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
