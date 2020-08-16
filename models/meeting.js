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
    }
  };
  meeting.init({
    userId: DataTypes.INTEGER,
    room: DataTypes.STRING,
    pin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'meeting',
  });
  return meeting;
};