const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const auth = require("./config/authentication");
const router = require("./routes/index.js");

const app = express();

auth.init();

app.use(helmet());
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "stayio-session",
    keys: ["STAYIO-COOKIE"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
if (process.env.NODE_ENV === "production") app.use(morgan("combined"));

app.use("/api", router);

module.exports = app;
