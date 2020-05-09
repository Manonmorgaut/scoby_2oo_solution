const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const User = require("../models/User");

/**
 *  All routes are prefixed with /api/contacts
 */

router.get("/", (req, res, next) => {});
router.get("/:id", (req, res, next) => {});
router.post("/", (req, res, next) => {});
router.patch("/:id", (req, res, next) => {});
router.delete("/:id", (req, res, next) => {});

module.exports = router;
