// backend/config.js
require('dotenv').config();
const path = require('path');

module.exports = {
  PORT: process.env.PORT || 3001,
  JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',
  DB: {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: false
  }
}; 