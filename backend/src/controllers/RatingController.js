const { v4: uuid } = require("uuid");

const db = require("../config/database");
const Listing = require("../models/Listing");
const User = require("../models/User");
const Rating = require("../models/Rating");

const createRating = (req, res) => {
  const rid = uuid();
  const { lid } = req.params;
  const { rating, by } = req.body;
  Listing.findByPk(lid)
    .then((listing) => {
      Rating.create({
        rid,
        listing: lid,
        rating,
        by,
      })
        .then((rating) => {
          Listing.update(
            {
              ratings: db.fn("array_append", db.col("ratings"), rid),
            },
            {
              where: {
                lid: lid,
              },
            }
          )
            .then((l) => {
              User.update(
                {
                  ratedListings: db.fn(
                    "array_append",
                    db.col("ratedListings"),
                    lid
                  ),
                },
                { where: { uid: req.user.uid } }
              )
                .then((u) => res.json(rating))
                .catch((err) => res.status(500).json(err));
            })
            .catch((err) => res.status(500).json(err));
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
};

const getRatings = (req, res) => {
  Rating.findAll({ where: { listing: req.params.lid } })
    .then((ratings) => res.json(ratings))
    .catch((err) => res.status(500).json(err));
};

const getRating = (req, res) => {
  Rating.findByPk(req.params.id)
    .then((rating) => res.json(rating))
    .catch((err) => res.status(500).json(err));
};

const updateRating = (req, res) => {
  res.json();
};

const deleteRating = (req, res) => {
  Listing.findByPk(req.params.lid)
    .then((listing) => {
      Rating.findOne({ where: { by: req.params.id, listing: req.params.lid } })
        .then((rating) => {
          if (rating.by === req.user.uid || req.user.role === "admin")
            Rating.destroy({
              where: { by: req.params.id, listing: req.params.lid },
            })
              .then((row) => {
                Listing.update(
                  {
                    ratings: db.fn(
                      "array_remove",
                      db.col("ratings"),
                      rating.rid
                    ),
                  },
                  {
                    where: {
                      lid: req.params.lid,
                    },
                  }
                )
                  .then((l) => {
                    User.update(
                      {
                        ratedListings: db.fn(
                          "array_remove",
                          db.col("ratedListings"),
                          req.params.lid
                        ),
                      },
                      { where: { uid: req.params.id } }
                    )
                      .then((u) => res.json(u))
                      .catch((err) => res.status(500).json(err));
                  })
                  .catch((err) => res.status(500).json(err));
              })
              .catch((err) => res.status(500).json(err));
          else res.status(403).json("Unauthorized");
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  createRating,
  getRatings,
  getRating,
  updateRating,
  deleteRating,
};
