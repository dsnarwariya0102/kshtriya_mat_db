var mysql = require("mysql");

var pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "123",
  database: "kshtriya_matrimony",
  multipleStatements: true /*execute more than one query at a time */,
});

// var pool = mysql.createPool({
//   host: "campusshala.com",
//   port: "3306",
//   user: "root_track4u",
//   password: "Vikram123@@",
//   database: "root_track4u",
//   multipleStatements: true /*execute more than one query at a time */,
// });

module.exports = pool;
