const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const productRoutes = require('./routes/products');
const prePurchaseRoutes = require('./routes/prePurchases');
const saleRoutes = require('./routes/sales');

const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads')); // Para servir imágenes estáticas
app.use('/vouchers', express.static(path.join(__dirname, 'vouchers'))); // Para servir archivos PDF estáticos

app.use('/products', productRoutes);
app.use('/prePurchases', prePurchaseRoutes);
app.use('/sales', saleRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.sync({ force: true }); // force: true elimina y recrea las tablas
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
