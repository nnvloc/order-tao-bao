'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: DataTypes.INTEGER,
    itemsMoneyAmount: DataTypes.DOUBLE,
    totalAmount: DataTypes.DOUBLE,
    chinaDeliveryFee: DataTypes.DOUBLE,
    vnDeliveryFee: DataTypes.DOUBLE,
    serviceFee: DataTypes.DOUBLE,
    orderFee: DataTypes.DOUBLE,
    otherFee: DataTypes.DOUBLE,
    paidAmount: DataTypes.DOUBLE,
    discount: DataTypes.DOUBLE,
    deptAmount: DataTypes.DOUBLE,
    note: DataTypes.TEXT,
    status: DataTypes.STRING,
    depositAmount: DataTypes.DOUBLE,
    moneyExchangeRate: DataTypes.FLOAT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    this.hasMany(models['SubOrder'], { foreignKey: 'orderId', sourceKey: 'id', });
    this.hasMany(models['OrderItem'], { foreignKey: 'orderId', sourceKey: 'id', as: 'items' });
    this.hasMany(models['Transaction'], { foreignKey: 'orderId', sourceKey: 'id', as: 'transactions' })
    this.belongsTo(models['User'], { foreignKey: 'userId', });    
  };
  return Order;
};
