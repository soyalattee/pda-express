const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
      validate: (value) => value.length >= 5,
    },
    author: { type: String, require: true },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Board",
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
