var express = require("express");
const User = require("../models/User");
const { createToken, verifyToken } = require("../utils/auth");
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
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const tokenMaxAge = 60 * 60 * 24 * 3;
    const token = createToken(user, tokenMaxAge);
    user.token = token;
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: tokenMaxAge * 1000,
      secure: false,
      sameSite: false, //너 왜 'none'도 될거처럼 문서 써놓고 false만 돼????
    });
    console.log(user);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400);
    next(err);
  }
});
router.all("/logout", async (req, res, next) => {
  try {
    console.log(res.cookie);
    res.cookie("authToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400);
    next(err);
  }
});

module.exports = router;
