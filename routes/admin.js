var express = require("express");
var router = express.Router();

const pool = require("./api/pool");
const bcrypt = require("bcrypt");
/*-----------------import JSON web Token-------------------*/
var jwt = require("jsonwebtoken");
/*-----------------Local Storage-------------------*/
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");

const config = require("../nodemon.json");

router.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const qry = "select * from admins where username=?";
  pool.query(qry, username, async (error, result) => {
    if (error) {
      return res
        .status(200)
        .json({ status: false, message: "No Record Found" });
    } else if (result[0]) {
      if (await bcrypt.compare(password, result[0].password)) {
        let { password, ...remainingData } = result[0];

        const token = jwt.sign({ sub: result[0].admin_id }, config.secret, {
          expiresIn: "2h",
        });
        // console.log(token);

        return res.status(200).json({
          access_token: token,
          token_type: "Bearer",
          // instance_url: "https://nfw-vcpl.herokuapp.com/",
          status: true,
          data: remainingData,
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Invalid password" });
      }
    } else {
      return res
        .status(200)
        .json({ status: false, message: "Email not found" });
    }
  });
});

router.post("/logout", (req, res) => {
  if (localStorage.getItem("token")) {
    localStorage.clear();
    return res.status(200).json({ status: true });
  }
});

router.post("/Add", async (req, res) => {
  const { username, password } = req.body;
  const hashPassword = await bcrypt.hashSync(password, 10);
  const user = { username, password: hashPassword };
  var qry = "insert into admins set ?";
  pool.query(qry, user, (error, result) => {
    if (error) {
      console.log(error);
      return res
        .status(200)
        .json({ status: false, message: "Record Not Submitted" });
    } else {
      return res
        .status(200)
        .json({ status: true, message: "Record Submitted" });
    }
  });
});

module.exports = router;
