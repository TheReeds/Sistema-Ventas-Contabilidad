module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    totalAmount: DataTypes.FLOAT,
    customerId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  Sale.associate = models => {
    Sale.belongsToMany(models.Product, { through: 'SaleProduct', foreignKey: 'saleId' });
  };

  return Sale;
};
