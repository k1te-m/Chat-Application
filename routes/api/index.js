const router = require("express").Router();
const authRoutes = require("./auth");
const channelRoutes = require("./channel");

// API Routes
router.use("/auth", authRoutes);
router.use("/channel", channelRoutes);

module.exports = router;
