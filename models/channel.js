const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  participants: [],
});

module.exports = mongoose.model("Channel", channelSchema);
