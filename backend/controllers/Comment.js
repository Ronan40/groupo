const Comment = require("../models/comment");
const fs = require("fs");

// Créer un comment :

exports.createComment = (req, res, next) => {
  const commentObject = JSON.parse(req.body.comment);
  delete commentObject._id;
  const comment = new Comment({
    ...commentObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  comment
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Modifier un comment :

exports.modifyComment = (req, res, next) => {
  const commentObject = req.file
    ? {
        ...JSON.parse(req.body.comment),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Comment.updateOne(
    { _id: req.params.id, userId: req.body.userId },
    { ...commentObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Supprimer un comment :

exports.deleteComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id })
    .then((comment) => {
      const filename = comment.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Comment.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id })
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllComment = (req, res, next) => {
  Comment.find()
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};
