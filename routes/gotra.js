var express = require("express");
var router = express.Router();
const pool = require("./api/pool");

/* GET home page. */
router.post("/add", function (req, res, next) {
  pool.query(
    "select * from gotra where gotra_name=?",
    [req.body.gotra_name],
    function (error, result) {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ status: false, message: "Server Error!....." });
      } else {
        if (result.length > 0) {
          // console.log(result.length, "second Record");
          return res
            .status(200)
            .json({ status: true, message: "Duplicate Data Found......" });
        } else {
          /*---------------------------------*/

          console.log(req.body);
          var body = req.body;
          var qry = "insert into gotra set ? ";
          pool.query(qry, body, function (error, result) {
            if (error) {
              console.log(error);
              return res
                .status(500)
                .json({ status: false, message: "Server Error!......" });
            } else {
              return res
                .status(200)
                .json({ status: true, message: "Record Submitted....." });
            }
          });
        }
      }
    }
  );
});

/*--------------Edit data in gotra table---------------- */
router.put("/edit/:gotra_id", function (req, res, next) {
  qry = "update gotra set gotra_name=? where gotra_id=?";
  // console.log(qry);
  pool.query(
    qry,
    [req.body.gotra_name, req.params.gotra_id],
    function (error, result) {
      if (error) {
        return res
          .status(500)
          .json({ status: false, message: "Server Error!......" });
      } else {
        return res
          .status(200)
          .json({ status: true, message: "Record Updated....." });
      }
    }
  );
});

/*--------------Display All gotra---------------- */
router.get("/display", function (req, res, next) {
  pool.query("select * from gotra", function (error, result) {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: false, message: "Server Error!....." });
    } else {
      return res.status(200).json({
        status: true,
        data: result,
        message: "Data Exist....",
      });
    }
  });
});

/*--------------Display By ID---------------- */
router.put("/display/:gotra_id", function (req, res, next) {
  pool.query(
    "select * from gotra where gotra_id=?",
    [req.params.gotra_id],
    function (error, result) {
      if (error) {
        return res
          .status(500)
          .json({ status: false, message: "Server Error!...." });
      } else {
        return res
          .status(200)
          .json({ status: true, data: result, message: "Record Found..." });
      }
    }
  );
});

/*--------------Delete By Users_ID---------------- */
router.delete("/delete/:gotra_id", function (req, res, next) {
  pool.query(
    "delete from gotra where gotra_id=?",
    [req.params.gotra_id],
    function (error, result) {
      if (error) {
        return res
          .status(500)
          .json({ status: false, message: "Server Error!...." });
      } else {
        return res
          .status(200)
          .json({ status: true, data: result, message: "Record Found..." });
      }
    }
  );
});
module.exports = router;
