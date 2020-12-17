const { Sequelize } = require("sequelize");

("use strict");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 40],
      },
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 40],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.associate = (models) => {
    // hasMany association: foreign key (userId) stored on target model (Text)
    User.hasMany(models.Comment, { foreignKey: "userId", sourceKey: "id" });
  };
  return User;
};
