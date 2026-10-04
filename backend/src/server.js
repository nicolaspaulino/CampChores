const express = require('express');
const cors = require('cors');

const sequelize = require('./database');
require('./models/Usuario');

const usuariosRoutes = require('./routes/usuarios');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuariosRoutes);

async function iniciar() {
  try {
    await sequelize.authenticate();

    console.log('Banco conectado com sucesso!');

    await sequelize.sync();

    console.log('Tabelas sincronizadas com sucesso!');

    app.listen(3000, () => {
      console.log('Servidor rodando em http://localhost:3000');
    });
  } catch (error) {
    console.error('Erro ao iniciar:', error);
  }
}

iniciar();