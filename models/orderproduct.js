'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderProduct.belongsTo(models.Product)
      OrderProduct.belongsTo(models.Order)
    }
  };
  OrderProduct.init({
    quantity: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderProduct',
  });
  return OrderProduct;
};