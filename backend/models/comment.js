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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  });

  return Comment;
};
