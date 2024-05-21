var express = require("express");
const User = require("../models/User");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.signUp(email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400);
    next(err);
  }
});

module.exports = router;
