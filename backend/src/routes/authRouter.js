const router = require("express").Router();

const AuthController = require("../controllers/AuthController");

router
  .post("/login", AuthController.login)
  .post("/logout", AuthController.logout);
// .post('/social', (req, res) => {

// })
// .post('/verify', (req, res) => {

// })
// .post('/validate', (req, res) => {

// })

module.exports = router;
