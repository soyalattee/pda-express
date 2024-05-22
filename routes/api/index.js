var express = require("express");
var router = express.Router();

router.use("/board", require("./board"));
router.use("/users", require("./users"));

module.exports = router;
