module.exports = (sequelize, DataTypes) => {
  const PrePurchase = sequelize.define('PrePurchase', {
    customerId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  PrePurchase.associate = models => {
    PrePurchase.belongsToMany(models.Product, { through: models.PrePurchaseProduct, foreignKey: 'prePurchaseId' });
  };

  return PrePurchase;
};
