const cors = require("cors");
const router = require("express").Router();

const { jwtVerify } = require("../config/authentication");
const RatingController = require("../controllers/RatingController");

router
  .options(cors())
  .get("/:lid", jwtVerify, RatingController.getRatings)
  .get("/:id", jwtVerify, RatingController.getRating)
  .post("/:lid", jwtVerify, RatingController.createRating)
  .put("/:id", jwtVerify, RatingController.updateRating)
  .delete("/:lid/:id", jwtVerify, RatingController.deleteRating);

module.exports = router;
