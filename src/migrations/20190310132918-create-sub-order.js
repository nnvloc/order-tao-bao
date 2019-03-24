'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SubOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      externalOrderId: {
        type: Sequelize.STRING,
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNUll: false,
      },
      sellerUserId: {
        type: Sequelize.STRING,
      },

      itemsMoneyAmount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      vnDeliveryFee: Sequelize.DOUBLE,
      serviceFee: Sequelize.DOUBLE,
      orderFee: Sequelize.DOUBLE,
      otherFee: Sequelize.DOUBLE,
      paidAmount: Sequelize.DOUBLE,
      discount: Sequelize.DOUBLE,
      deptAmount: Sequelize.DOUBLE,
      depositAmount: Sequelize.DOUBLE,
      moneyExchangeRate: Sequelize.FLOAT,
      totalAmount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      note: Sequelize.TEXT,
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: Sequelize.DATE,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SubOrders');
  }
};
