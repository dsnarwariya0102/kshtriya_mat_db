var express = require("express");
var router = express.Router();

var pool = require("./api/pool");

/* GET home page. */
router.get("/display", function (req, res, next) {
  pool.query("select * from qualification", function (error, result) {
    if (error) {
      return res.status(500).json({ status: "false", message: "Server Error" });
    } else {
      return res
        .status(200)
        .json({ status: "true", data: result, message: "Record Found" });
    }
  });
});

module.exports = router;
