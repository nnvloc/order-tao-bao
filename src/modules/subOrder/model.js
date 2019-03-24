'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubOrder = sequelize.define('SubOrder', {
    userId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    itemsMoneyAmount: DataTypes.DOUBLE,
    sellerUserId: DataTypes.STRING,
    externalOrderId: DataTypes.STRING,
    chinaDeliveryFee: DataTypes.DOUBLE,
    vnDeliveryFee: DataTypes.DOUBLE,
    serviceFee: DataTypes.DOUBLE,
    orderFee: DataTypes.DOUBLE,
    otherFee: DataTypes.DOUBLE,
    paidAmount: DataTypes.DOUBLE,
    discount: DataTypes.DOUBLE,
    deptAmount: DataTypes.DOUBLE,
    depositAmount: DataTypes.DOUBLE,
    moneyExchangeRate: DataTypes.FLOAT,
    totalAmount: DataTypes.DOUBLE,
    note: DataTypes.TEXT,
    status: DataTypes.STRING,
    depositsAmount: DataTypes.DOUBLE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {});
  
  SubOrder.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models['Order'], { foreignKey: 'orderId' });
    this.hasMany(models['OrderItem'], { foreignKey: 'subOrderId', sourceKey: 'id', as: 'orderItems' });
    this.belongsTo(models['User'], { foreignKey: 'userId' });
  };
  return SubOrder;
};
