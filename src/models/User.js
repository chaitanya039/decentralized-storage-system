const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    mobile: { type: String },
    googleId: { type: String },
    provider: { type: String, default: "local" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
