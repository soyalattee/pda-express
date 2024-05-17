const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // res.setEncoding("My first board");
  res.send("Birds home page");
});
router.get("/about/:id", (req, res) => {
  // res.setEncoding("My first board");
  res.send("About birds");
});

//router.post
//router.put
//router.delete
//router.all

module.exports = router;
