"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 100],
      },
    },
    content: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 400],
      },
    },
  });
  return Post;
};
