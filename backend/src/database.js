const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'campchores',
  'postgres',
  'finite',
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  }
);

module.exports = sequelize;