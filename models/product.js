'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static formatPrice(price){		
      let	reverse = price.toString().split('').reverse().join('')
      let ribuan 	= reverse.match(/\d{1,3}/g);
      ribuan	= ribuan.join('.').split('').reverse().join('');
      return `Rp. ${ribuan}`
    }
    
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Order,{through:models.OrderProduct})
      Product.hasMany(models.OrderProduct)
    }
  };
  Product.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `eName=Field Name can't be empty`
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `ePrice=Field price can't be empty`
        },
        min: {
          args : 1,
          msg: `ePrice=Price must be more then 0`
        }
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `eStock=Field stock can't be empty`
        },
        // min: {
        //   args : -1,
        //   msg: `eStock=Stock must be more then 0`
        // },
        isNegative(value) {
          if (value < 0) {
            throw new Error('eStock=Stock must be more then equal 0');
          }
        }
      }
    },
    desc: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `eDesc=Field Description can't be empty`
        }
      }
    },
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};