module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    detail: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  Product.associate = models => {
    Product.hasMany(models.Stock, { foreignKey: 'productId' });
    Product.hasMany(models.Discount, { foreignKey: 'productId' });
    Product.belongsToMany(models.PrePurchase, { through: models.PrePurchaseProduct, foreignKey: 'productId' });
  };

  return Product;
};
