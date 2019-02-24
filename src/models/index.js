'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../db/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const modulePath = path.join(__dirname, '../modules');

fs
  .readdirSync(modulePath)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .map((folder) => {
    const folderPath = path.join(modulePath, `/${folder}`);
    return fs.readdirSync(folderPath)
      .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js' && file.toLowerCase().includes('model'));
      })
      .map((file => {
        return `${folderPath}/${file}`;
      }))
      .join(', ');
  })
  .forEach(file => {
    if (!file) {
      return;
    }
    const model = sequelize['import'](file);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
