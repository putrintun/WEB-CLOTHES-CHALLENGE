'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transaksi,{
        foreignKey: "product_id",
        as: "transaksi product" 
      })
    }
  }
  product.init({
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    image: DataTypes.STRING,
    stock: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'product',
    tableName: "product"
  });
  return product;
};