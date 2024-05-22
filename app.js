var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const apiRouter = require("./routes/api");
const birdsRouter = require("./routes/birds");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const session = require("express-session");

//.env 읽고 환경설정
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("mongo Connected Success");
  })
  .catch((err) => console.log(err));

var app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // 안쓰면 전체허용
// view engine setup : 삭제. 우린 화면은 리액트에서 보여줄 거니까
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger("dev"));
app.use(express.json()); // json parse를 미들웨어로 해준것.
app.use(express.urlencoded({ extended: false })); //url 인코딩 미들웨어
app.use(cookieParser()); //쿠키 파싱
app.use(
  //세션 미들웨어
  session({
    secret: process.env.SESSION_SECRET || "<my-secret>",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(express.static(path.join(__dirname, "public")));

const { authenticate } = require("./utils/auth");
app.use(authenticate);

function trackPage(sess, url) {
  if (sess.urlHistory) {
    sess.urlHistory.push(url);
    if (sess.urlHistory.length > 10) {
      sess.urlHistory.shift();
    }
  } else {
    sess.urlHistory = [url];
  }
  console.log(sess.urlHistory);
}

app.use(function (req, res, next) {
  trackPage(req.session, req.url);
  next();
});

app.use("/api", apiRouter); // 하위에 보드,유저 존재
app.use("/birds", birdsRouter);

app.get("/", function (req, res) {
  res.send("hello world");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
  res.json(err);
});

module.exports = app;
