const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "The username is required."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "The email is required."],
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        "Please use a valid email address.",
      ],
    },
    password: {
      type: String,
      match: [
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter",
      ],
      required: true,
    },
    avatar: {
      type: String,
    },
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
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) return next;
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (passwordInput) {
  return bcrypt.compare(passwordInput, this.password);
};

const User = model("User", userSchema);
module.exports = User;
