const expressJwt = require("express-jwt");
const config = require("../../nodemon.json");

function jwt() {
  const { secret } = config;
  return expressJwt({ secret, algorithms: ["RS256", "sha1", "HS256"] }).unless({
    path: [
      // public routes that don't require authentication
      "/admin/signin",
      "/authenticate",
    ],
  });
}

module.exports = jwt;
