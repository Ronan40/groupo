("use strict");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    userName: {
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
  return User;
};
