const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  var Like = sequelize.define("Like", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
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

  Like.associate = (models) => {
  // likes association
models.User.belongsToMany(models.Post, { through: Like, foreignKey: "userId" });
models.User.belongsToMany(models.Comment, { through: Like, foreignKey: "userId" });
  }
  return Like;
}