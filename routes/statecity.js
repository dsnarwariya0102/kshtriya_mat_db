var express = require("express");
var router = express.Router();

const pool = require("./api/pool");

router.get("/state", function (req, res, next) {
  pool.query("select * from state", function (error, result) {
    if (error) {
      // console.log(error);
      return res
        .status(500)
        .json({ status: false, message: "Server Error!....." });
    } else {
      // console.log(result);
      return res
        .status(200)
        .json({ status: true, data: result, message: "Record Found....." });
    }
  });
});

router.put("/city/:c_state_id", function (req, res, next) {
  // console.log(req.params);
  qry = "select * from city where c_state_id=?";
  // console.log(qry);
  pool.query(qry, [req.params.c_state_id], function (error, result) {
    if (error) {
      return res
        .status(500)
        .json({ status: false, message: "Server Error!....." });
    } else {
      // console.log(result);
      return res
        .status(200)
        .json({ status: true, data: result, message: "Record Found....." });
    }
  });
});

module.exports = router;
