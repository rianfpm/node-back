'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sales.belongsTo(models.Customer, {
        foreignKey: 'customer_id'
      }),
        Sales.hasMany(models.SalesItem, {
          foreignKey: 'sales_id'
        })
    }
  }
  Sales.init({
    sales_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    kode_transaksi: {
      type: DataTypes.STRING
    },
    tanggal_transaksi: {
      type: DataTypes.DATE
    },
    customer_id: {
      type: DataTypes.STRING
    },
    total_diskon: {
      type: DataTypes.INTEGER
    },
    total_harga: {
      type: DataTypes.INTEGER
    },
    total_bayar: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Sales',
  });
  return Sales;
};