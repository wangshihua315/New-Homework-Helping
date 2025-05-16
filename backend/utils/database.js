const { Sequelize } = require('sequelize');
const { DB } = require('../config');

// SQLite不需要用户名和密码
const sequelize = new Sequelize({
  dialect: DB.dialect,
  storage: DB.storage,
  logging: DB.logging
});

module.exports = sequelize; 