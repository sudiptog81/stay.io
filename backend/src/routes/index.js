const router = require("express").Router();

const userRouter = require("./userRouter");
const adminRouter = require("./adminRouter");
const listingRouter = require("./listingRouter");
const commentRouter = require("./commentRouter");
const likeRouter = require("./likeRouter");
const ratingRouter = require("./ratingRouter");
const authRouter = require("./authRouter");

router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/listing", listingRouter);
router.use("/comment", commentRouter);
router.use("/like", likeRouter);
router.use("/rating", ratingRouter);
router.use("/auth", authRouter);

module.exports = router;
