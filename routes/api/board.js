const express = require("express");
const router = express.Router();
const Board = require("../../models/Board");
const Comment = require("../../models/Comment");
const { loginRequired } = require("../../utils/auth");
router.get("/", (req, res) => {
  Board.find().then((result) => {
    res.json(result);
  });
});

function trackBoard(sess, boardId) {
  if (sess.boardPath) {
    sess.boardPath.push(boardId);
    if (sess.boardPath.length > 10) {
      sess.boardPath.shift();
    }
  } else {
    sess.boardPath = [boardId];
  }
  console.log(sess.boardPath);
}

router.get("/:boardId", (req, res) => {
  Board.findById(req.params.boardId).then((result) => {
    trackBoard(req.session, req.params.boardId);
    res.json(result);
  });
});

router.post("/", loginRequired, (req, res) => {
  const { title, content } = req.body;
  console.log("user info :", req.user);
  Board.create({
    title: title,
    content: content,
    author: req.user.email,
  }).then((result) => {
    res.status(201).json(result);
  });
});

router.put("/:boardId", (req, res) => {
  const { title } = req.body;

  Board.findByIdAndUpdate(
    req.params.boardId,
    { title },
    { new: true, runValidators: true } // new: true는 업데이트된 문서를 반환하도록 설정, runValidators: true는 모델 스키마의 유효성 검사를 실행
  )
    .then((updatedBoard) => {
      if (!updatedBoard) {
        return res.status(404).send("게시글을 찾을 수 없습니다.");
      }
      res.json(updatedBoard);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("서버 오류");
    });
});

router.delete("/:boardId", (req, res) => {
  Board.findByIdAndDelete(req.params.boardId)
    .then((result) => {
      if (!result) {
        return res.status(404).send("게시글을 찾을 수 없습니다.");
      }
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("서버 오류");
    });
});

router.post("/:boardId/comments", (req, res) => {
  const boardId = req.params.boardId;
  const { content, author } = req.body;
  Comment.create({
    content: content,
    author: author,
    board: boardId,
  }).then((result) => {
    res.json(result);
  });
});

router.put("/:boardId/comments/:commentId", (req, res) => {
  const { boardId, commentId } = req.params;
  const { content, author } = req.body;
  Comment.findOneAndUpdate(
    {
      board: boardId,
      _id: commentId,
    },
    {
      content: content,
      author: author,
    }
  ).then((result) => {
    res.json(result);
  });
});

router.put("/:boardId/comments/:commentId", (req, res) => {
  const { boardId, commentId } = req.params;
  Comment.findOneAndDelete({
    board: boardId,
    _id: commentId,
  }).then((result) => {
    res.status(204).send();
  });
});

module.exports = router;
