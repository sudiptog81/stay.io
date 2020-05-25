const { Op } = require("sequelize");
const { v4: uuid } = require("uuid");

const User = require("../models/User");
const Rating = require("../models/Rating");
const Comment = require("../models/Comment");
const Listing = require("../models/Listing");
const db = require("../config/database");

const createListing = (req, res) => {
  const lid = uuid();
  const { title, description, photoUrl, by, byOrgName } = req.body;
  Listing.create({
    lid,
    title,
    description,
    photoUrl,
    by,
    byOrgName,
  })
    .then((listing) => res.json(listing))
    .catch((err) => res.status(500).json({ err, body: req.body }));
};

const getListings = (req, res) => {
  if (req.query.filter)
    Listing.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        [req.query.filterBy]: req.query.filterVal,
      },
    })
      .then((listings) => res.json(listings))
      .catch((err) => res.status(500).json(err));
  else if (req.query.search)
    Listing.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        [Op.or]: {
          title: { [Op.iLike]: "%" + req.query.term + "%" },
          description: { [Op.iLike]: "%" + req.query.term + "%" },
        },
      },
    })
      .then((listings) => res.json(listings))
      .catch((err) => res.status(500).json(err));
  else
    Listing.findAll({
      order: [["createdAt", "DESC"]],
    })
      .then((listings) => res.json(listings))
      .catch((err) => res.status(500).json(err));
};

const getListing = (req, res) => {
  Listing.findByPk(req.params.id)
    .then((listing) => res.json(listing))
    .catch((err) => res.status(500).json(err));
};

const updateListing = (req, res) => {
  if (req.user.role === "admin")
    Listing.update(
      {
        title: req.body.title,
        description: req.body.description,
        photoUrl: req.body.photoUrl,
      },
      { where: { lid: req.params.id } }
    )
      .then((listing) => res.json(listing))
      .catch((err) => res.status(500).json(err));
  else
    Listing.update(
      {
        title: req.body.title,
        description: req.body.description,
        photoUrl: req.body.photoUrl,
      },
      { where: { lid: req.params.id, by: req.user.uid } }
    )
      .then((listing) => res.json(listing))
      .catch((err) => res.status(500).json(err));
};

const deleteListing = (req, res) => {
  if (req.user.role === "admin")
    Listing.destroy({ where: { lid: req.params.id } })
      .then((row) => {
        res.json(row);
      })
      .catch((err) => res.status(500).json(err));
  else
    Listing.destroy({ where: { lid: req.params.id, by: req.user.uid } })
      .then((row) => {
        User.update(
          {
            likedListings: db.fn(
              "array_remove",
              db.col("likedListings"),
              req.params.id
            ),
          },
          { where: { uid: req.user.uid } }
        )
          .then((r) => res.json(r))
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
};

module.exports = {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing,
};
