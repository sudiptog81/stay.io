const Comment = require("../models/Comment");
const Listing = require("../models/Listing");
const User = require("../models/User");
const db = require("../config/database");

const likeListing = (req, res) => {
  Listing.findByPk(req.params.id)
    .then((listing) => {
      Listing.increment("likes", {
        where: {
          lid: req.params.id,
        },
        by: 1,
      })
        .then((l) => {
          User.update(
            {
              likedListings: db.fn(
                "array_append",
                db.col("likedListings"),
                req.params.id
              ),
            },
            { where: { uid: req.user.uid } }
          )
            .then((u) => res.json(l))
            .catch((err) => res.status(500).json(err));
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
};

const likeComment = (req, res) => {
  Comment.findByPk(req.params.id)
    .then((comment) => {
      Comment.increment("likes", {
        where: {
          cid: req.params.id,
        },
        by: 1,
      })
        .then((c) => {
          User.update(
            {
              likedComments: db.fn(
                "array_append",
                db.col("likedComments"),
                req.params.id
              ),
            },
            { where: { uid: req.user.uid } }
          )
            .then((u) => res.json(c))
            .catch((err) => res.status(500).json(err));
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
};

const dislikeListing = (req, res) => {
  Listing.findByPk(req.params.id)
    .then((listing) => {
      Listing.increment("likes", {
        where: {
          lid: req.params.id,
        },
        by: -1,
      })
        .then((l) => {
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
            .then((u) => res.json(l))
            .catch((err) => res.status(500).json(err));
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
};

const dislikeComment = (req, res) => {
  Comment.findByPk(req.params.id)
    .then((comment) => {
      Comment.increment("likes", {
        where: {
          cid: req.params.id,
        },
        by: -1,
      })
        .then((c) => {
          User.update(
            {
              likedComments: db.fn(
                "array_remove",
                db.col("likedComments"),
                req.params.id
              ),
            },
            { where: { uid: req.user.uid } }
          )
            .then((u) => res.json(c))
            .catch((err) => res.status(500).json(err));
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  likeListing,
  likeComment,
  dislikeComment,
  dislikeListing,
};
