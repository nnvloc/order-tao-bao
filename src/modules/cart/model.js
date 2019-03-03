'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: DataTypes.INTEGER,
    items: DataTypes.TEXT('long'),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});

  Cart.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models['User'], { foreignKey: 'userId' });
  };
  return Cart;
};
