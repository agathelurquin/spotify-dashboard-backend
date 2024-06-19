const { Schema, model } = require("mongoose");

const playlistSchema = new Schema(
  {
    title: {
      type: String,
      require: trusted,
    },
    description: {
      type: String,
    },
    tracks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Track",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Playlist", playlistSchema);
