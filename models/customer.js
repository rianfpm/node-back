'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Sales, {
        foreignKey: 'customer_id'
      })
    }
  }
  Customer.init({
    customer_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING
    },
    contact: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    alamat: {
      type: DataTypes.TEXT
    },
    diskon: {
      type: DataTypes.INTEGER
    },
    tipe_diskon: {
      type: DataTypes.STRING
    },
    ktp: {
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};