const cors = require("cors");
const passport = require("passport");
const router = require("express").Router();

const AuthController = require("../controllers/AuthController");

router
  .options(cors())
  .post("/login", AuthController.login)
  .post("/logout", AuthController.logout)
  .get(
    "/facebook",
    passport.authenticate("facebook-token"),
    AuthController.facebook
  );

module.exports = router;
