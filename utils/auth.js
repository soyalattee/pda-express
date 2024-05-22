const jwt = require("jsonwebtoken");

//미들웨어. 항상 사용하게 해주려고함
async function authenticate(req, res, next) {
  //Cookie에 있는 authToken을 가져오거나
  let token = req.cookies.authToken;
  //header의 authention에 있는 bearer 토큰 가져온다
  let headerToken = req.headers.authtk;
  if (!token && headerToken) {
    console.log(headerToken);
    token = headerToken;
  }
  const user = verifyToken(token);
  req.user = user;
  next(); // req.user 객체를 사용할 수 있게됨
}

function createToken(visibleUser, maxAge = 60 * 60 * 24 * 3) {
  return jwt.sign(visibleUser, process.env.JWT_SECRET || "MyJWT", {
    expiresIn: maxAge,
  });
}
function verifyToken(_token) {
  if (!_token) {
    return null;
  }
  const verifiedToken = jwt.verify(_token, process.env.JWT_SECRET || "MyJWT");
  return verifiedToken;
}

async function loginRequired(req, res, next) {
  if (!req.user) {
    const error = new Error("login Required.");
    error.status = 403;
    next(error);
  }
  next();
}
module.exports = {
  loginRequired,
  authenticate,
  createToken,
  verifyToken,
};
