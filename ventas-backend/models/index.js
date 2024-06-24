const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Cargar la configuración de la base de datos
const config = require('../config/config.json').development;

// Crear una instancia de Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

// Objeto para contener todos los modelos
const db = {};

// Leer los archivos de modelos y definirlos en Sequelize
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')  // Filtrar el archivo index.js
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Definir las asociaciones entre los modelos
Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

// Exportar la instancia de Sequelize y los modelos
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
