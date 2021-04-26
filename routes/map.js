var express = require("express");
var router = express.Router();

var pool = require("./api/pool");

router.post("/add", function (req, res, next) {
  console.log(req.body);
  var body = req.body;
  var qry = "insert into usermap set ?";

  pool.query(qry, body, function (error, result) {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: false, message: "Server Error!......" });
    } else {
      return res
        .status(200)
        .json({ status: true, message: "Record Submitted...." });
    }
  });
});

router.post("/fromShowMap", function (req, res, next) {
  var qry = "select * from usermap where date BETWEEN ? AND ?";
  console.log(req.body);
  pool.query(
    qry,
    [req.body.fromdate, req.body.todate],
    function (error, result) {
      if (error) {
        return res
          .status(500)
          .json({ status: 500, message: "Server Error!...." });
      } else {
        if (result.length > 0) {
          // console.log(result.length);
          // console.log(result);
          return res
            .status(200)
            .json({ status: true, data: result, message: "Record Found...." });
        } else {
          return res
            .status(200)
            .json({ status: true, data: [], message: "No Record Found" });
        }
      }
    }
  );
});

router.put("/display/:transaction_id", function (req, res, next) {
  console.log(req.params);
  var qry = "select * from usermap where transaction_id=?";
  pool.query(qry, [req.params.transaction_id], function (error, result) {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: false, message: "Server Error!....." });
    } else {
      console.log(result);
      return res
        .status(200)
        .json({ status: true, data: result, message: "Record Found...." });
    }
  });
});

router.put("/display", function (req, res, next) {
  console.log(req.body);
  var qry = "select * from usermap where date between ? AND ?";
  pool.query(
    qry,
    [req.body.fromdate, req.body.todate],
    function (error, result) {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ status: false, message: "Server Error!....." });
      } else {
        console.log(result);
        return res
          .status(200)
          .json({ status: true, data: result, message: "Record Found...." });
      }
    }
  );
});

router.get("/display", function (req, res, next) {
  pool.query("select * from usermap", function (error, result) {
    if (error) {
      return res.status(500).json({ status: false, message: "Server Error" });
    } else {
      // console.log(result.length);
      // console.log(result);
      return res
        .status(200)
        .json({ status: true, data: result, message: "Record Found....." });
    }
  });
});

module.exports = router;
