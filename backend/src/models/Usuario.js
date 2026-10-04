const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Usuario;