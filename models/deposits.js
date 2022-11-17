/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class deposits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  deposits.init(
    {
      id: DataTypes.NUMBER,
      amount: DataTypes.NUMBER,
      currency: DataTypes.STRING,
      createdAt: DataTypes.STRING,
      updatedAt: DataTypes.STRING,
      userId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: 'deposits',
    },
  );
  return deposits;
};
