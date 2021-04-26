var express = require("express");
var router = express.Router();

var upload = require("./api/multer");
var pool = require("./api/pool");

router.post("/add", upload.single("user_image"), function (req, res, next) {
  // console.log(req.body);
  pool.query(
    "select * from users where mobile_no=?",
    [req.body.mobile_no],
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

          // console.log(req.body);
          var body = req.body;
          body.user_image = req.file.filename;
          var qry = "insert into users set ? ";
          pool.query(qry, body, function (error, result) {
            if (error) {
              console.log(error);
              return res
                .status(500)
                .json({ status: false, message: "Server Error!......" });
            } else {
              console.log(result.insertId);
              return res
                .status(200)
                .json({ userid: result.insertId, status: true, message: "" });
            }
          });
        }
      }
    }
  );
});

/*--------------Edit Image in users table---------------- */
router.post(
  "/editImage/:user_id",
  upload.single("user_image"),
  function (req, res, next) {
    // console.log(req.file, req.params);
    var qry = "update users set user_image=? where user_id=?";
    console.log(qry);
    pool.query(
      qry,
      [req.file.filename, req.params.user_id],
      function (error, result) {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .json({ status: false, message: "Server Error!....." });
        } else {
          return res
            .status(200)
            .json({ status: true, message: "Image Updated" });
        }
      }
    );
  }
);

/*--------------Edit data in users table---------------- */
router.put("/edit/:user_id", function (req, res, next) {
  qry =
    "update users set name=?,dob=?,gender=?,qualification=?,occupation=?,mobile_no=?,email_id=?,father_name=?,father_occupation=?,mother_name=?,grand_father_name=?,grand_mother_name=?,self_gotra=?,mama_gotra=?,mother_mama_gotra=?,father_mama_gotra=?,address=?,state=?,city=?,country=?,marriage_status=? where user_id=?";
  // console.log(qry);
  pool.query(
    qry,
    [
      req.body.name,
      req.body.dob,
      req.body.gender,
      req.body.qualification,
      req.body.occupation,
      req.body.mobile_no,
      req.body.email_id,
      req.body.father_name,
      req.body.father_occupation,
      req.body.mother_name,
      req.body.grand_father_name,
      req.body.grand_mother_name,
      req.body.self_gotra,
      req.body.mama_gotra,
      req.body.mother_mama_gotra,
      req.body.father_mama_gotra,
      req.body.address,
      req.body.state,
      req.body.city,
      req.body.country,
      req.body.marriage_status,
      req.params.user_id,
    ],
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

/*--------------Display All Users---------------- */
router.get("/display", function (req, res, next) {
  pool.query("select * from users", function (error, result) {
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
router.put("/display/:user_id", function (req, res, next) {
  pool.query(
    "select * from users where user_id=?",
    [req.params.user_id],
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
router.delete("/delete/:user_id", function (req, res, next) {
  pool.query(
    "delete from users where user_id=?",
    [req.params.user_id],
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
