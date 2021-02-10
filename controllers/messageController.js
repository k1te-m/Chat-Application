const Message = require("../models/message");

module.exports = {
  getMessagesById: (req, res) => {
    const id = req.params._id;
    Message.findOne({ _id: id })
      .then((message) => {
        res.json(message);
      })
      .catch((error) => res.status(422).json(error));
  },
  getMessagesByChannel: (req, res) => {
    const channel = req.params.channel;
    post
      .find({ channel: channel })
      .then((messages) => {
        res.json(messages);
      })
      .catch((error) => res.status(422).json(error));
  },
  saveMessage: (req, res) => {
    Message.create(req.body)
      .then((dbModel) => {
        res.json(dbModel);
        console.log("Message saved...");
      })
      .catch((error) => res.status(422).json(error));
  },
};
