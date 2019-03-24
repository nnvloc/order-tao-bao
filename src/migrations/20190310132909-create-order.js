'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
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
      itemsMoneyAmount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      totalAmount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      note: Sequelize.TEXT,
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      chinaDeliveryFee: Sequelize.DOUBLE,
      vnDeliveryFee: Sequelize.DOUBLE,
      serviceFee: Sequelize.DOUBLE,
      orderFee: Sequelize.DOUBLE,
      otherFee: Sequelize.DOUBLE,
      paidAmount: Sequelize.DOUBLE,
      discount: Sequelize.DOUBLE,
      deptAmount: Sequelize.DOUBLE,
      depositAmount: Sequelize.DOUBLE,
      moneyExchangeRate: Sequelize.FLOAT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};
