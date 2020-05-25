const router = require("express").Router();

const { jwtVerify } = require("../config/authentication");
const LikeController = require("../controllers/LikeController");

router
  .post("/listing/:id", jwtVerify, LikeController.likeListing)
  .post("/comment/:id", jwtVerify, LikeController.likeComment)
  .delete("/listing/:id", jwtVerify, LikeController.dislikeListing)
  .delete("/comment/:id", jwtVerify, LikeController.dislikeComment);

module.exports = router;
