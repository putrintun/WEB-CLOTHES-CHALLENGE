'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.admin, {
        foreignKey: "admin_id",
        as: "admin"
      })
      this.belongsTo(models.product, {
        foreignKey: "product_id",
        as: "product"
      })
    }
  }
  transaksi.init({
    transaksi_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customer_name: DataTypes.STRING,
    customer_phone: DataTypes.STRING,
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qty: DataTypes.DOUBLE,
    waktu: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'transaksi',
    tableName: "transaksi"
  });
  return transaksi;
};