const User = require("../models/User");

const addAdmin = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      User.update({ role: "admin" }, { where: { uid: req.params.id } })
        .then((u) => res.json(u))
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
};

const deleteAdmin = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      User.update({ role: "user" }, { where: { uid: req.params.id } })
        .then((u) => res.json(u))
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
};

const addProvider = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      User.update({ role: "provider" }, { where: { uid: req.params.id } })
        .then((u) => res.json(u))
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
};

const deleteProvider = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      User.update({ role: "user" }, { where: { uid: req.params.id } })
        .then((u) => res.json(u))
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  addAdmin,
  deleteAdmin,
  addProvider,
  deleteProvider,
};
