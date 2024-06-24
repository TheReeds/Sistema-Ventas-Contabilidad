module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define('Discount', {
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    discountValue: DataTypes.FLOAT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  Discount.associate = models => {
    Discount.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return Discount;
};
