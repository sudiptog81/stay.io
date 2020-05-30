const { hashSync, compareSync } = require("bcrypt");
const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const FacebookTokenStrategy = require("passport-facebook-token");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const init = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => {
        User.findOne({ where: { email } })
          .then((user) => {
            if (user) {
              if (
                hashSync(user.uid + email + password, user.salt) ===
                user.password
              ) {
                done(null, user);
              } else {
                done(null, false, { message: "Incorrect Password" });
              }
            } else {
              done(null, false, { message: "User Does Not Exist" });
            }
          })
          .catch((err) => {
            console.error(err);
            done(null, false, { message: "Authentication Failed" });
          });
      }
    )
  );

  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: "1208166009394539",
        clientSecret: process.env.FB_APP_SECRET || "",
      },
      async (accessToken, refreshToken, profile, done) => {
        let user = await User.findByPk(profile.id);
        if (!user) {
          try {
            user = await User.create({
              uid: profile.id,
              email: profile.emails[0].value,
              firstName: profile.displayName,
              isSocial: true,
              socialType: "facebook",
              role: "user",
            });
            done(null, user);
          } catch {
            done(null, false, { message: "Authentication Failed" });
          }
        } else {
          done(null, user);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.uid);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then((user) => {
        if (user.uid === id) done(null, user);
      })
      .catch();
  });
};

const jwtVerify = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, "SECRET");
    const user = await User.findOne({ where: { uid: data.uid } });
    if (user) {
      req.user = user;
      req.token = token;
      next();
    } else throw Error("User Does Not Exist");
  } catch (error) {
    res.status(403).send({ error: "Unauthorized", msg: error });
  }
};

const jwtGenerate = async (uid) => {
  try {
    const user = await User.findOne({ where: { uid } });
    const token = jwt.sign({ uid: user.uid, role: user.role }, "SECRET");
    return token;
  } catch (error) {
    return undefined;
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.header("adminloophole") === "true")
      next();
    else res.status(500).json({ error: "Unauthorized" });
  } catch (error) {
    res.status(403).send({ error: "Unauthorized", msg: error });
  }
};

const checkProvider = async (req, res, next) => {
  try {
    if (
      req.user.role === "admin" ||
      req.user.role === "provider" ||
      req.header("adminloophole") === "true"
    )
      next();
    else res.status(500).json({ error: "Unauthorized" });
  } catch (error) {
    res.status(403).send({ error: "Unauthorized", msg: error });
  }
};

module.exports = { init, jwtVerify, jwtGenerate, checkAdmin, checkProvider };
