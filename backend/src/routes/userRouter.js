const cors = require("cors");
const router = require("express").Router();

const { jwtVerify } = require("../config/authentication");
const UserController = require("../controllers/UserController");

router
  .options(cors())
  .post("/register", UserController.createUser)
  .post("/register/provider", UserController.createProvider);
router
  .get("/profile/:id", jwtVerify, UserController.getUser)
  .put("/profile/:id", jwtVerify, UserController.updateUser)
  .delete("/profile/:id", jwtVerify, UserController.deleteUser);

module.exports = router;
