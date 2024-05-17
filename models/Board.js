const mongoose = require("mongoose");

//스키마 정의
const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: String,
    num: {
      type: Number,
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true,
  }
);

boardSchema.set("toJSON", { virtuals: true });
boardSchema.set("toObject", { virtuals: true });
boardSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "board",
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;

/**
 * Mongoose에 데이터 추가하기
 * 1) 객체 만들고 save
 * 2) create 하고 save
 *
 */
