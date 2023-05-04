'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SalesItem.belongsTo(models.Sales, {
        foreignKey: 'sales_id'
      }),
        SalesItem.belongsTo(models.Item, {
          foreignKey: 'item_id'
        })
    }
  }
  SalesItem.init({
    salesitem_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    sales_id: {
      type: DataTypes.INTEGER,
    },
    item_id: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'SalesItem',
  });
  return SalesItem;
};