const passport = require("passport");

const { jwtGenerate } = require("../config/authentication");

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(500).json({ user, msg: "Login Failed", info });
    }
    req.login(user, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        delete user.dataValues.password;
        delete user.dataValues.salt;
        jwtGenerate(user.dataValues.uid).then((token) => {
          user.dataValues.token = token;
          res.json(user.dataValues);
        });
      }
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout();
  res.json({ success: true });
};

module.exports = {
  login,
  logout,
};
