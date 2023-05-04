'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasMany(models.SalesItem, {
        foreignKey: 'item_id'
      })
    }
  }
  Item.init({
    item_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING
    },
    unit: {
      type: DataTypes.STRING
    },
    stok: {
      type: DataTypes.STRING
    },
    harga_satuan: {
      type: DataTypes.INTEGER
    },
    barang: {
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};