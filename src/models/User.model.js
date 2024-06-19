const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    spotifyId: {
      type: String,
      // required: true,
      unique: true,
    },
    displayName: {
      type: String,
      // required: true,
    },
    accessToken: {
      type: String,
      // required: true,
    },
    refreshToken: {
      type: String,
      // required: true,
    },
    // Add additional fields as needed
    role: {
      type: String,
      default: "user",
      enum: ["user", "artist"],
    },
    playlists: [
      {
        type: Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
    profileUrl: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
