'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.task.belongsTo(models.user)
      models.task.belongsTo(models.meeting)
      models.task.hasMany(models.comment)
    }
  };
  task.init({
    content: DataTypes.STRING,
    meetingId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};
