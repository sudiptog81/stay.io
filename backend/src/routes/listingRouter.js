const cors = require("cors");
const router = require("express").Router();

const { jwtVerify, checkProvider } = require("../config/authentication");
const ListingController = require("../controllers/ListingController");

router
  .options("/", cors())
  .get("/", jwtVerify, ListingController.getListings)
  .post("/", jwtVerify, checkProvider, ListingController.createListing)
  .get("/:id", jwtVerify, ListingController.getListing)
  .put("/:id", jwtVerify, checkProvider, ListingController.updateListing)
  .delete("/:id", jwtVerify, checkProvider, ListingController.deleteListing);

module.exports = router;
