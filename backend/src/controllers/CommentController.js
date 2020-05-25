const { v4: uuid } = require("uuid");

const db = require("../config/database");
const Listing = require("../models/Listing");
const Comment = require("../models/Comment");

const createComment = (req, res) => {
  const cid = uuid();
  const { lid } = req.params;
  const { text, commenter, by } = req.body;
  Listing.findByPk(lid)
    .then((listing) => {
      Comment.create({
        cid,
        listing: lid,
        text,
        commenter,
        by,
      })
        .then((comment) => {
          Listing.update(
            {
              likedComments: db.fn("array_append", db.col("comments"), cid),
            },
            { where: { lid: req.params.lid } }
          )
            .then((l) => res.json(comment))
            .catch((err) => res.status(500).json(err));
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
};

const getComments = (req, res) => {
  Comment.findAll({ where: { listing: req.params.lid } })
    .then((comments) => res.json(comments))
    .catch((err) => res.status(500).json(err));
};

const getComment = (req, res) => {
  Comment.findByPk(req.params.id)
    .then((comment) => res.json(comment))
    .catch((err) => res.status(500).json(err));
};

const updateComment = (req, res) => {
  res.json();
};

const deleteComment = (req, res) => {
  Comment.findByPk(req.params.id)
    .then((c) => {
      if (c.by === req.user.uid || req.user.role === "admin")
        Comment.destroy({ where: { cid: req.params.id } })
          .then(async (row) => {
            await Listing.update(
              {
                likedComments: db.fn(
                  "array_remove",
                  db.col("comments"),
                  req.params.id
                ),
              },
              { where: { lid: req.params.lid } }
            );
            res.json(row);
          })
          .catch((err) => res.status(500).json(err));
      else res.status(403).json("Unauthorized");
    })
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
};
