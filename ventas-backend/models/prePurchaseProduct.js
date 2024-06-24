module.exports = (sequelize, DataTypes) => {
    const PrePurchaseProduct = sequelize.define('PrePurchaseProduct', {
      prePurchaseId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'PrePurchases',
          key: 'id'
        }
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      quantity: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    }, {
      timestamps: true
    });
  
    return PrePurchaseProduct;
  };
  