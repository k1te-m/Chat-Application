const router = require("express").Router();
const channelController = require("../../controllers/channelController");
const auth = require("../../middleware/auth");

// @route  GET api/channel
// @desc   Get all channels
// @access Privates
router.get("/", auth, channelController.getChannels);

// @route  POST api/channel
// @desc   Create a channel
// @access Private
router.post("/", auth, channelController.saveChannel);

module.exports = router;
