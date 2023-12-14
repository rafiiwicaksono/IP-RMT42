'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Food.belongsTo(models.User)
      Food.hasMany(models.Order)
    }
  }
  Food.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Name is Required`
        }, notEmpty: {
          msg: `Name is Required`
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Image URL is Required`
        }, notEmpty: {
          msg: `Image URL is Required`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Price is Required`
        }, notEmpty: {
          msg: `Price is Required`
        }
      }
    },
    calory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Calory is Required`
        }, notEmpty: {
          msg: `Calory is Required`
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
    }
  }, {
    sequelize,
    modelName: 'Food',
    
  });
  return Food;
};