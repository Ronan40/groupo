"use strict";

const Sequelize = require("sequelize");
const db = {};

const sequelize = new Sequelize(
  "groupomania_development",
  "root",
  null,
  {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user")(db.sequelize, db.Sequelize);
db.comment = require("./comment")(db.sequelize, db.Sequelize);
db.post = require("./post")(db.sequelize, db.Sequelize);

db.comment.belongsTo(db.post, {
  onDelete: "CASCADE",
  foreignKey: "postId",
  sourceKey: "id",
}),
  db.comment.belongsTo(db.user, {
    onDelete: "CASCADE",
    foreignKey: "userId",
    sourceKey: "id",
  }),
  db.post.belongsTo(db.user, {
    onDelete: "CASCADE",
    foreignKey: "userId",
    sourceKey: "id",
  }),
  db.sequelize
    .authenticate()
    .then(() => {
      console.log("It works !");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

module.exports = db;
