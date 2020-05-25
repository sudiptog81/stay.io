const router = require("express").Router();

const { jwtVerify, checkAdmin } = require("../config/authentication");
const AdminController = require("../controllers/AdminController");

router
  .post("/add/:id", jwtVerify, checkAdmin, AdminController.addAdmin)
  .delete("/delete/:id", jwtVerify, checkAdmin, AdminController.deleteAdmin)
  .post("/provider/add/:id", jwtVerify, checkAdmin, AdminController.addProvider)
  .delete(
    "/provider/delete/:id",
    jwtVerify,
    checkAdmin,
    AdminController.deleteProvider
  );

module.exports = router;
