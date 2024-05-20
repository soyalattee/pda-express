const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // res.setEncoding("My first board");
  console.log("현재 쿠키:", req.cookies);
  res.cookie("cookieName", "my-cookie-value", {
    // key, value
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true, // js 접근불가(프론트에서 접근 불가 )
    secure: false, // http프로토콜만 쿠키 사용 가능
    signed: false, // 서명여부
  });
  res.cookie("httpOnlyFalse", "httpOnlyFalseValue", {
    // key, value
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: false, // js 접근불가(프론트에서 접근 불가 )
    secure: false, // https프로토콜만 쿠키 사용 가능, secure 키면 https만 가능
    signed: false, // 서명여부 (HTTPS)
  });
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
    req.session.viewCount = 1;
  }

  //쿠키가 만료되면 새로 발급되면서 세션데이터도 초기화됨
  console.log(req.session);
  res.send(`Birds home page 방문: ${req.session.viewCount}`);
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
