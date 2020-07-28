const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const uploader = require("../config/cloudinary");
const requireAuth = require("../middlewares/requireAuth"); // Route protection middleware : )

router.get("/", (req, res, next) => {
  Item.find({})
    .populate("id_user") // Gives us the author's id (id_user) object document instead of just the id : )
    .then((itemDocuments) => {
      res.status(200).json(itemDocuments);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/", requireAuth, uploader.single("image"), (req, res, next) => {
  const updateValues = { ...req.body };

  if (req.file) {
    updateValues.image = req.file.path;
  }

  updateValues.id_user = req.session.currentUser._id; // Retrieve the authors id from the session.

  Item.create(updateValues)
    .then((itemDocument) => {
      itemDocument
        .populate("id_user").execPopulate() // Populate on .create() does not work, but we can use populate() on the document once its created !
        .then((item) => {
          res.status(201).json(item); // send the populated document.
        })
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.patch( "/:id", requireAuth,uploader.single("image"), (req, res, next) => {
    const item = { ...req.body };

    if (req.file) {
      item.image = req.file.secure_url;
    }

    Item.findByIdAndUpdate(req.params.id, item, { new: true }).populate("id_user")
      .then((itemDocument) => {
        res.status(200).json(itemDocument);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
);

router.delete("/:id", requireAuth, (req, res, next) => {
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
