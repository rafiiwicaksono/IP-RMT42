'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Food)
      User.hasOne(models.Profile)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: `Username is already registered`
      },
      validate: {
        notNull: {
          msg: `Username is Required`
        }, 
        notEmpty: {
          msg: `Username is Required`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: `Email is already registered`
      },
      validate: {
        notNull: {
          msg: `Email is Required`
        }, 
        notEmpty: {
          msg: `Email is Required`
        },
        isEmail: {
          msg: `Email Must be Email Format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password is Required`
        }, 
        notEmpty: {
          msg: `Password is Required`
        },
        len: {
          args: [5, 255],
          msg: `Pasword Minimum 5 Characters`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: `user`
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance) => {
    instance.password = hashPassword(instance.password)
  })
  return User;
};