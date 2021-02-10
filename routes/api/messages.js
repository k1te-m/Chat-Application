const router = require("express").Router();
const messagesController = require("../../controllers/messageController");

// @route  POST api/messages
// @desc   Save message to db
// @access Public
router.post("/", messagesController.saveMessage);

module.exports = router;
