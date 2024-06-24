module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    quantity: DataTypes.INTEGER,
    purchasePrice: DataTypes.FLOAT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  Stock.associate = models => {
    Stock.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return Stock;
};
