const { v4: uuid } = require("uuid");
const { hashSync, genSaltSync } = require("bcrypt");
const { jwtGenerate } = require("../config/authentication");

const User = require("../models/User");
const Listing = require("../models/Listing");
const Comment = require("../models/Comment");

const getUser = (req, res) => {
  User.findOne({ where: { uid: req.params.id } })
    .then((user) => {
      delete user.dataValues.password;
      delete user.dataValues.salt;
      res.json(user.dataValues);
    })
    .catch((err) => res.status(500).json(err));
};

const createUser = (req, res) => {
  const uid = uuid();
  const { email, firstName, lastName, password: passwordPlain } = req.body;
  const salt = genSaltSync(10);
  const password = hashSync(uid + email + passwordPlain, salt);
  User.findOne({ where: { email: email } })
    .then((u) => {
      if (u) {
        res.status(500).json({ err: "User Exists" });
      } else {
        User.create({
          uid,
          email,
          firstName,
          lastName,
          password,
          salt,
          role: "user",
        })
          .then((user) => {
            delete user.dataValues.password;
            delete user.dataValues.salt;
            jwtGenerate(uid).then((token) => {
              user.dataValues.token = token;
              res.json(user.dataValues);
            });
          })
          .catch((err) => res.status(500).json(err));
      }
    })
    .catch((err) => res.status(500).json(err));
};

const createProvider = (req, res) => {
  const uid = uuid();
  const {
    email,
    firstName,
    lastName,
    orgName,
    password: passwordPlain,
  } = req.body;
  const salt = genSaltSync(10);
  const password = hashSync(uid + email + passwordPlain, salt);
  User.findOne({ where: { email: email } })
    .then((u) => {
      if (u) {
        res.status(500).json({ err: "User Exists" });
      } else {
        User.create({
          uid,
          email,
          firstName,
          lastName,
          password,
          salt,
          orgName,
          role: "provider",
        })
          .then((user) => {
            delete user.dataValues.password;
            delete user.dataValues.salt;
            jwtGenerate(uid).then((token) => {
              user.dataValues.token = token;
              res.json(user.dataValues);
            });
          })
          .catch((err) => res.status(500).json(err));
      }
    })
    .catch((err) => res.status(500).json(err));
};

const updateUser = (req, res) => {
  if (req.body.salt) delete req.body.salt;
  if (req.body.role) delete req.body.role;
  if (req.body.password) delete req.body.password;
  if (req.body.email) delete req.body.email;

  User.findByPk(req.params.id)
    .then((u) => {
      if (u) {
        User.update(req.body, { where: { uid: req.params.id } })
          .then((user) => {
            delete user.dataValuespassword;
            delete user.dataValuessalt;
            res.json(user.dataValues);
          })
          .catch((err) => res.status(500).json(err));
      } else res.status(500).json("User Does Not Exist");
    })
    .catch((err) => res.status(500).json(err));
};

const deleteUser = (req, res) => {
  User.findByPk(req.params.id)
    .then((u) => {
      if (u.role !== "provider") {
        User.destroy({ where: { uid: req.params.id } })
          .then((row) => res.json(row))
          .catch((err) => res.status(500).json(err));
      } else {
        Listing.destroy({ where: { by: req.params.id } });
        User.destroy({ where: { uid: req.params.id } })
          .then((row) => res.json(row))
          .catch((err) => res.status(500).json(err));
      }
    })
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  getUser,
  createUser,
  createProvider,
  updateUser,
  deleteUser,
};
