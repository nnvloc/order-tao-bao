'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    subOrderId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    isSupportMix: DataTypes.BOOLEAN,
    shopMoneyExchangeRate: DataTypes.FLOAT,
    siteMoneyExchangeRate: DataTypes.FLOAT,
    itemId: DataTypes.STRING,
    itemName: DataTypes.STRING,
    skuId: DataTypes.STRING,
    skuProps: DataTypes.STRING,
    previewImageUrl: DataTypes.STRING,
    linkItem: DataTypes.STRING,
    sellerPrice: DataTypes.FLOAT,
    sellerUserId: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    beginAmount: DataTypes.INTEGER,
    others: DataTypes.STRING,
    totalAmount: DataTypes.DOUBLE,
  }, {});
  OrderItem.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models['Order'], { foreignKey: 'orderId' });
    this.belongsTo(models['SubOrder'], { foreignKey: 'subOrderId' });
  };
  return OrderItem;
};
