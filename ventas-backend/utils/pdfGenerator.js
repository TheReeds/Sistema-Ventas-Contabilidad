const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateVoucherPDF = (prePurchase, sale, filePath) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));
  
    doc.fontSize(20).text('Voucher de Compra', { align: 'center' });
  
    doc.fontSize(12).text(`Fecha: ${new Date().toLocaleDateString()}`, { align: 'right' });
    doc.fontSize(12).text(`RUC/Boleta: ${sale ? sale.id : prePurchase.id}`, { align: 'right' });
  
    doc.moveDown();
    doc.text(`Cliente ID: ${prePurchase.customerId}`);
  
    doc.moveDown();
    doc.text('Productos:');
    doc.moveDown();
  
    const tableTop = 200;
    const itemCodeX = 50;
    const itemNameX = 150;
    const itemQuantityX = 250;
    const itemPriceX = 350;
    const itemTotalX = 450;
  
    doc.fontSize(10).font('Helvetica-Bold');
    doc.text('Código', itemCodeX, tableTop);
    doc.text('Nombre', itemNameX, tableTop);
    doc.text('Cantidad', itemQuantityX, tableTop);
    doc.text('Precio Unitario', itemPriceX, tableTop);
    doc.text('Subtotal', itemTotalX, tableTop);
  
    let position = tableTop + 20;
  
    doc.font('Helvetica');
    prePurchase.Products.forEach(product => {
      const quantity = product.PrePurchaseProduct.quantity;
      const discount = product.Discount ? product.Discount.discountValue : 0;
      const price = product.price - discount;
      doc.text(product.id, itemCodeX, position);
      doc.text(product.name, itemNameX, position);
      doc.text(quantity, itemQuantityX, position);
      doc.text(price.toFixed(2), itemPriceX, position);
      doc.text((price * quantity).toFixed(2), itemTotalX, position);
      position += 20;
    });
  
    doc.moveDown();
    if (sale) {
      doc.text(`Monto Total: ${sale.totalAmount.toFixed(2)}`, { align: 'right' });
    } else {
      const totalAmount = prePurchase.Products.reduce((sum, product) => {
        const discount = product.Discount ? product.Discount.discountValue : 0;
        return sum + (product.price - discount) * product.PrePurchaseProduct.quantity;
      }, 0);
      doc.text(`Monto Total (Estimado): ${totalAmount.toFixed(2)}`, { align: 'right' });
    }
  
    doc.end();
  };
  

const generateSalesReportPDF = async (sales, filePath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text('Libro de Registro de Ventas', { align: 'center' });

  doc.moveDown();
  doc.fontSize(12).text(`Fecha de Generación: ${new Date().toLocaleDateString()}`, { align: 'right' });

  doc.moveDown();
  doc.text('Ventas:');
  doc.moveDown();

  // Dibujar la tabla de ventas
  const tableTop = 150;
  const saleIdX = 50;
  const saleDateX = 150;
  const customerIdX = 250;
  const totalAmountX = 350;

  doc.fontSize(10).font('Helvetica-Bold');
  doc.text('Número de Venta', saleIdX, tableTop);
  doc.text('Fecha', saleDateX, tableTop);
  doc.text('Cliente', customerIdX, tableTop);
  doc.text('Monto Total', totalAmountX, tableTop);

  let position = tableTop + 20;

  doc.font('Helvetica');
  sales.forEach(sale => {
    doc.text(sale.id, saleIdX, position);
    doc.text(sale.createdAt.toLocaleDateString(), saleDateX, position);
    doc.text(sale.customerId, customerIdX, position);
    doc.text(sale.totalAmount.toFixed(2), totalAmountX, position);
    position += 20;
  });

  doc.end();
};

module.exports = {
  generateVoucherPDF,
  generateSalesReportPDF
};
