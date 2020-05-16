module.exports = function requireAuth(req, res, next) {
  if (req.currentUser) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
