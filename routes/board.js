const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const Comment = require("../models/Comment");

router.get("/", (req, res) => {
  // Comment.create({
  //   content: "댓글1 다섯글자",
  //   author: "작성자1",
  //   tags: ["Science", "love", "돼지고기", "고기"],
  // })
  //   .then((result) => {
  //     res.json(result);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.json(err);
  //   });
  // const board = new Board({
  //   title: "제목1",
  //   content: "내용1",
  //   author: "작성자1",
  // });
  // board.save().then((result) => {
  //   console.log(result);
  //   res.json(result);
  // });
  //저장하겠다! promise리턴함
  // res.send("My first board");
  // Board.insertMany([
  //   {
  //     title: "제목3-1",
  //     content: "내용3",
  //     author: "작성자1",
  //     num: 1,
  //   },
  //   {
  //     title: "제목4-1",
  //     content: "내용4",
  //     author: "작성자4",
  //     num: 3,
  //   },
  //   {
  //     title: "제목5-1",
  //     content: "내용5",
  //     author: "작성자5",
  //     num: 5,
  //   },
  //   {
  //     title: "제목6-1",
  //     content: "내용6",
  //     author: "작성자1",
  //     num: 2,
  //   },
  // ])
  //   .then((data) => {
  //     res.json(data);
  //   })
  //   .catch((err) => console.log(err));
  //전부찾아서 보여주기
  // Board.find().then((data) => {
  //   res.json(data);
  // });
  // num 2 보다 큰(greater than) ,데이터 조회 크거나 같은(gte) , 작은(lt), 작거나 같은(lte)
  // Board.find({
  //   num: {
  //     $gte: 2,
  //   },
  // }).then((result) => res.json(result));
  //
  // Board.find({
  //   num: {
  //     $lt: 5,
  //   },
  // }).then((result) => res.json(result));
  //하나만 찾기
  // Board.findOne().then((data) => {
  //   res.json(data);
  // });
  //하나만 찾기
  // Board.find({ author: "작성자1" }).then((data) => {
  //   res.json(data);
  // });
  //하나만 id로찾기
  // Board.findById("6646a172ec6ecd2c0a2551fb").then((data) => {
  //   res.json(data);
  // });
  //하나 삭제
  // Board.deleteOne({ title: "제목4" }).then((result) => {
  //   res.json(result);
  // });
  //여러개 삭제
  // Board.deleteMany({ author: "작성자1" }).then((result) => {
  //   res.json(result);
  // });
  // Board.updateOne({ title: "제목3" }, { content: "내용2 수정" }).then(
  //   (result) => {
  //     res.json(result);
  //   }
  // );
  // Board.insertMany([
  //   { title: "제목8", content: "내용5", author: "작성자3" },
  // ]).then((result) => res.json(result));

  // Board.findOne().then((board) => {
  //   Comment.create({
  //     conetent: "new coment",
  //     author: "sys",
  //     board: board,
  //   }).then((result) => {
  //     res.json(result);
  //   });
  // });
  //populate 보드가 있는애들은 보드도 나와라
  // Comment.find()
  //   .populate("board")
  //   .then((result) => {
  //     res.json(result);
  //   });
  Board.find()
    .populate("comments")
    .exec()
    .then((result) => {
      res.json(result);
    });
});

module.exports = router;
