const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const uploader = require("../config/cloudinary");
const requireAuth = require("../middlewares/requireAuth");

/***************************
 * ALL THE ROUTES ARE
 * PREFIXED WITH /api/items : )
 **************************/

router.get("/", (req, res, next) => {
  Item.find({})
    .populate("id_user")
    .then((itemDocuments) => {
      res.status(200).json(itemDocuments);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/", requireAuth, uploader.single("image"), (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.secure_url;
  }

  req.body.id_user = req.currentUser._id;
  Item.create(req.body)
    .then((itemDocument) => {
      res.status(201).json(itemDocument);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.patch("/:id", (req, res, next) => {
  Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((itemDocument) => {})
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res, next) => {
  Item.findByIdAndRemove(req.params.id)
    .then((itemDocument) => {
      if (itemDocument === null) {
        res.status(404).json({ message: "Resource to delete not found" });
      } else {
        res.status(204).json(itemDocument);
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
