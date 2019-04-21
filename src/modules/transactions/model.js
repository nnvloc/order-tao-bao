'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    beforeChangeAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    afterChangeAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    changeAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderId: DataTypes.INTEGER,
    subOrderId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models['User'], { foreignKey: 'userId', });
    this.belongsTo(models['Order'], { foreignKey: 'orderId' });
    this.belongsTo(models['SubOrder'], { foreignKey: 'subOrderId' });
  };
  return Transaction;
};