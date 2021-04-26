var express = require("express");
var router = express.Router();

var pool = require("./api/pool");
var upload = require("./api/multer");

/*--------insert Data Into Siblings Table------- */
router.post("/addMultiplePerson", function (req, res, next) {
  var qry = "";
  req.body.name.map((item, index) => {
    qry += `insert into siblings set user_id=${req.body.user_id},name='${item}',occupation='${req.body.occupation[index]}',user_relation='${req.body.user_relation[index]}'; `;
  });
  // console.log(qry);

  pool.query(qry, function (error, result) {
    if (error) {
      // console.log(error);
      return res
        .status(500)
        .json({ status: false, message: "Server Error!....." });
    } else {
      // console.log(req.body);
      return res
        .status(200)
        .json({ status: true, message: "Record Inserted....." });
    }
  });
});

/*--------Dislplay Data From Siblings Table------- */
router.get("/display", function (req, res, next) {
  var qry =
    "select S.*,(select U.name from users U where U.user_id=S.user_id) as username from siblings S";
  pool.query(qry, function (error, result) {
    if (error) {
      // console.log(error);
      return res
        .status(500)
        .json({ status: false, message: "Server Error!....." });
    } else {
      // console.log(result);
      return res.status(200).json({
        status: true,
        data: result,
        message: "Data Exist....",
      });
    }
  });
});

/*-------------Edit Data In Siblings Table------------ */

router.put("/edit/:siblings_id", function (req, res, next) {
  // console.log(req.body);
  pool.query(
    "update siblings set user_id=?,name=?,occupation=?,user_relation=? where siblings_id=?",
    [
      req.body.user_id,
      req.body.name,
      req.body.occupation,
      req.body.user_relation,
      req.params.siblings_id,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ status: false, message: "Server Error...." });
      } else {
        return res
          .status(200)
          .json({ status: true, message: "Record Updated....." });
      }
    }
  );
});

/*-------------Delete Data Into Siblings Table------------ */
router.delete("/delete/:siblings_id", function (req, res, next) {
  pool.query(
    "delete from siblings where siblings_id=?",
    [req.params.siblings_id],
    function (error, result) {
      if (error) {
        return res
          .status(500)
          .json({ status: false, message: "Server Error!....." });
      } else {
        return res
          .status(200)
          .json({ status: true, message: "Record Deleted..." });
      }
    }
  );
});

module.exports = router;
