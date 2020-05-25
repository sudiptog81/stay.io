const cors = require("cors");
const router = require("express").Router();

const { jwtVerify } = require("../config/authentication");
const CommentController = require("../controllers/CommentController");

router
  .options(cors())
  .get("/:lid", jwtVerify, CommentController.getComments)
  .get("/:id", jwtVerify, CommentController.getComment)
  .post("/:lid", jwtVerify, CommentController.createComment)
  .put("/:lid/:id", jwtVerify, CommentController.updateComment)
  .delete("/:lid/:id", jwtVerify, CommentController.deleteComment);

module.exports = router;
