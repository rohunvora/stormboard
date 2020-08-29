'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.belongsTo(models.meeting)
      models.user.hasMany(models.comment)
      models.user.hasMany(models.task)
      models.user.hasMany(models.vote)
    }
  };
  user.init({
    nickname: DataTypes.STRING,
    meetingId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    voteId: DataTypes.INTEGER,
    googleId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
