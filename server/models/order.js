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
    static associate(models) {
      Order.belongsTo(models.User)
      Order.belongsTo(models.Food)
    }
  }
  Order.init({
    totalAmount: DataTypes.INTEGER,
    totalOrder: DataTypes.INTEGER,
    FoodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `FoodId is Required`
        }, notEmpty: {
          msg: `FoodId is Required`
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `UserId is Required`
        }, notEmpty: {
          msg: `UserId is Required`
        }
      }
    },
    statusPayment: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: `Payment Pending`
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};