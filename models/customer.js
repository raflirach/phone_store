'use strict';

const {
  Model
} = require('sequelize');
const hasPassword = require('../helpers/hasPassword');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    getFullName(){
      return `${this.first_name} ${this.last_name}`
    }

    static associate(models) {
      // define association here
      Customer.hasMany(models.Order)
    }
  };
  Customer.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance,options) => {
        instance.password = hasPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};