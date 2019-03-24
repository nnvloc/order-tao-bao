'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      itemName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subOrderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sellerUserId: Sequelize.STRING,
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isSupportMix: Sequelize.BOOLEAN,
      itemId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      skuId: Sequelize.STRING,
      skuProps: Sequelize.STRING,
      previewImageUrl: Sequelize.STRING,
      linkItem: Sequelize.STRING,
      sellerPrice: Sequelize.FLOAT,
      price: Sequelize.DOUBLE,
      beginAmount: Sequelize.INTEGER,
      others: Sequelize.STRING,
      note: Sequelize.TEXT,
      shopMoneyExchangeRate: Sequelize.FLOAT,
      siteMoneyExchangeRate: Sequelize.FLOAT,
      totalAmount: {
        type: Sequelize.DOUBLE,
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
      deletedAt: {
        type: Sequelize.DATE,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('OrderItems');
  }
};
