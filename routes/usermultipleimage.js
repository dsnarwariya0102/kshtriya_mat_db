var express = require("express");
var router = express.Router();

var pool = require("./api/pool");
var upload = require("./api/multer");

/* GET home page. */
router.post("/add", upload.any(), function (req, res, next) {
  var qry = `insert into user_multiple_image(users_id ,multiple_image)values ?`;
  pool.query(
    qry,
    [req.files.map((item) => [req.body.users_id, item.originalname])],
    function (error, result) {
      if (error) {
        console.log(error);
        return res
          .status(200)
          .json({ status: false, message: "Serve Error!....." });
      } else {
        return res
          .status(200)
          .json({ status: true, message: "Record Submitted....." });
      }
    }
  );
});

/*--------------Display By ID---------------- */
router.put("/display/:user_id", function (req, res, next) {
  pool.query(
    "select * from multipleimage where user_id=?",
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

/*--------------Display All Users multiple Image---------------- */
router.get("/display", function (req, res, next) {
  pool.query(
    "select MI.*,(select U.name from users U where U.user_id=MI.users_id) as username from user_multiple_image MI",
    function (error, result) {
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
    }
  );
});

/*--------------------Update Single Image-----------------*/
router.post(
  "/edit/:transaction_id",
  upload.single("multiple_image"),
  (req, res) => {
    var qry =
      "update user_multiple_image set multiple_image=? where transaction_id=?";
    pool.query(
      qry,
      [req.file.filename, req.params.transaction_id],
      (error, result) => {
        if (error) {
          return res
            .status(200)
            .json({ status: false, message: "Image not Upload" });
        } else {
          return res
            .status(200)
            .json({ status: true, message: "Image Upload Sucessfully" });
        }
      }
    );
  }
);

/*-------------Delete Data Into Multiple Table------------ */
router.delete("/delete/:transaction_id", function (req, res, next) {
  pool.query(
    "delete from user_multiple_image where transaction_id=?",
    [req.params.transaction_id],
    function (error, result) {
      if (error) {
        return res
          .status(200)
          .json({ status: false, message: "Record Not Deleted" });
      } else {
        return res
          .status(200)
          .json({ status: true, message: "Record Deleted..." });
      }
    }
  );
});
module.exports = router;
