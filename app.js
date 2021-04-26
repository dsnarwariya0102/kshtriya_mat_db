var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var jwt = require("./routes/config/jwt");
var errorHandler = require("./routes/config/error-handler");

var indexRouter = require("./routes/index");
// var userRouter = require("./routes/user");
var usersRouter = require("./routes/users");
var mapRouter = require("./routes/map");
var usermultipleimageRouter = require("./routes/usermultipleimage");
var siblingsRouter = require("./routes/siblings");
var qualificationRouter = require("./routes/qualification");
var statecityRouter = require("./routes/statecity");
var adminRouter = require("./routes/admin");
var gotraRouter = require("./routes/gotra");
// var usermultipleimageRouter = require("./routes/usermultipleimage");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(jwt());

app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use("/", userRouter);
app.use("/map", mapRouter);
app.use("/multipleimage", usermultipleimageRouter);
app.use("/siblings", siblingsRouter);
app.use("/qualification", qualificationRouter);
app.use("/statecity", statecityRouter);
app.use("/admin", adminRouter);
app.use("/gotra", gotraRouter);
// app.use("/usermultipleimage", usermultipleimageRouter);

app.use(errorHandler);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
