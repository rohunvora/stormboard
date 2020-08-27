'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.vote.hasOne(models.user)
      models.vote.belongsTo(models.task)
    }
  };
  vote.init({
    userId: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    taskId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vote',
  });
  return vote;
};
