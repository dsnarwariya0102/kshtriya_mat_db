var express = require("express");
var router = express.Router();
const config = require("../nodemon.json");
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

router.post("/authenticate", function (req, res, next) {
  try {
    // create a jwt token that is valid for 7 days
    const token = jwt.sign(
      { sub: randomIntFromInterval(1, 9) },
      config.secret,
      {
        expiresIn: "2h",
      }
    );
    //  console.log("access_token", token);
    return res.status(200).json({
      access_token: token,
      // instance_url: "https://nfw-vcpl.herokuapp.com/",
      token_type: "Bearer",
      issued_at: new Date().valueOf(),
    });
  } catch (err) {
    next();
  }
});

module.exports = router;
