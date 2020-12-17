var db = require(".");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define("Comment", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 200],
      },
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: db.User,
        key: "id",
      },
      allowNull: false,
    },
    postId: {
      type: DataTypes.UUID,
      references: {
        model: db.Post,
        key: "id",
      },
      allowNull: true,
    },
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.Reddit, {
      onDelete: "CASCADE",
      foreignKey: "postId",
      sourceKey: "id",
    }),
      Comment.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: "userId",
        sourceKey: "id",
      }),
      Comment.hasMany(models.Like, { foreignKey: "likeId", sourceKey: "id" });
  };
  return Comment;
};
