var db = require('../models');
const { Sequelize } = require('sequelize')

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reddit = sequelize.define('Reddit', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 100]
      }
    },
    content: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 400]
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: false,
    },
  });
  Post.associate = (models) => {
    Post.hasMany(models.Comment, { foreignKey: 'commentId', sourceKey: 'id' }),
    Post.belongsTo(models.User, { onDelete: 'CASCADE', foreignKey: 'userId', sourceKey:'id' }),
    Post.hasMany(models.Like, { foreignKey: 'likeId', sourceKey: 'id' })
};
  return Reddit;
}