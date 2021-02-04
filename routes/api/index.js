const router = require("express").Router();
const authRoutes = require("./auth");

// API Routes
router.use("/auth", authRoutes);

module.exports = router;
