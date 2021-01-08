module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define("Comment", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 200],
      },
    },
  });

  return Comment;
};
