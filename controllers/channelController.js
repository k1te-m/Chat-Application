const Channel = require("../models/channel");

module.exports = {
  getChannels: (req, res) => {
    Channel.find({})
      .sort({ date: -1 })
      .then((channels) => res.json(channels))
      .catch((error) => res.status(422).json(error));
  },
  saveChannel: async (req, res) => {
    await Channel.create(req.body)
      .then((channel) => {
        res.json(channel);
        console.log("Channel created.");
      })
      .catch((error) => res.status(422).json(error));
  },
  getChannelById: (req, res) => {
    const id = req.params._id;
    Channel.findOne({ _id: id })
      .then((channel) => res.json(channel))
      .catch((error) => res.status(422).json(error));
  },
};
