const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { signUpErrors, signInErrors } = require("../utils/errors");

// Créer un compte utilisateur :

exports.signup = (req, res, next) => {
  // Password is not acceptable
  if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/.test(req.body.password)) {
    // Test password strength
    return res.status(401).json({
      error: { signUpErrors },
    });
  } else {
    // Password is acceptable, hash it
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

// Connection à un compte utilisateur :

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ signInErrors  });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          console.log(req.headers);
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.MY_SECRET_TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Supprimer un utilisateur

exports.deleteUser = (req, res, next) => {};

// Modifie les données de l'utiliseur

exports.updateUser = (req, res, next) => {};

// Renvoie les données d'un utilisateur

exports.getOneUser = (req, res, next) => {};
