const { Schema, model } = require("mongoose");

const trackSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
  },
  duration: {
    type: Number,
    required: true,
  },
  spotifyId: {
    type: String,
    required: true,
    unique: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Track", trackSchema);
