'use strict';
const {
  Model
} = require('sequelize');
const hasPassword = require('../helpers/hasPassword');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Account.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    CustomerId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (instance,options) => {
        instance.password = hasPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'Account',
  });
  return Account;
};