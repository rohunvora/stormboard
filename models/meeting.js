'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.meeting.hasMany(models.user)
      models.meeting.hasMany(models.task)
      models.meeting.hasMany(models.comment)
    }
  };
  meeting.init({
    nickname: DataTypes.STRING,
    room: DataTypes.STRING,
    pin: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'meeting',
  });
  return meeting;
};
