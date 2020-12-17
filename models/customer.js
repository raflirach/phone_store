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
    first_name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `efn=First Name can't be empty`
        },
        len: {
          args: [4,25],
          msg : `efn=first name harus 4-25 karakter`
        }
      }
    },
    last_name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `eln=Last Name can't be empty`
        },
        len: {
          args: [4,25],
          msg : `eln=last name harus 4-25 karakter`
        }
      }
    },
    username: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `eun=Username can't be empty`
        },
        len: {
          args: [4,25],
          msg : `eun=Username harus 4-25 karakter`
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `epass=Password can't be empty`
        },
        len: {
          args: [4,25],
          msg : `epass=Password harus 4-25 karakter`
        }
      }
    },
    phone_number: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `epn=Phone number can't be empty`
        },
      }
    },
    address: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `eadd=address can't be empty`
        },
      }
    }
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