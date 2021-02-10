const router = require("express").Router();
const messagesController = require("../../controllers/messageController");

// @route  POST api/messages
// @desc   Save message to db
// @access Public
router.post("/", messagesController.saveMessage);

// @route  GET api/messages/:channel
// @desc   Get messages posted to specific channel
// @access Public
router.get("/:channel", messagesController.getMessagesByChannel);

module.exports = router;
