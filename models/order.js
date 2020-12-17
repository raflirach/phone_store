'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    getDate(){
      return this.order_date.toJSON().slice(0,10)
    }
    static associate(models) {
      // define association here
      Order.belongsToMany(models.Product,{through:models.OrderProduct})
      Order.hasMany(models.OrderProduct)
      Order.belongsTo(models.Customer)
    }
  };
  Order.init({
    order_date: DataTypes.DATE,
    status: DataTypes.STRING,
    CustomerId: DataTypes.INTEGER
  }, {
    hooks : {
      beforeCreate: (instance) => {
        instance.order_date = new Date()
        instance.status = 'Belum Bayar'
      }
    },
    sequelize,
    modelName: 'Order',
  });
  return Order;
};