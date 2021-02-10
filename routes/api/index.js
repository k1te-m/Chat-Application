const router = require("express").Router();
const authRoutes = require("./auth");
const channelRoutes = require("./channel");
const messagesRoutes = require("./messages");

// API Routes
router.use("/auth", authRoutes);
router.use("/channel", channelRoutes);
router.use("/messages", messagesRoutes);

module.exports = router;
