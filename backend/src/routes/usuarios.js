const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nome, email, cpf, telefone, endereco, senha } = req.body;

    if (!nome || !email || !cpf || !telefone || !endereco || !senha) {
      return res.status(400).json({
        mensagem: 'Todos os campos são obrigatórios.',
      });
    }

    const usuarioExistente = await Usuario.findOne({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(409).json({
        mensagem: 'Este e-mail já está cadastrado.',
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      cpf,
      telefone,
      endereco,
      senha: senhaHash,
    });

    res.status(201).json({
      mensagem: 'Usuário criado com sucesso.',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensagem: 'Erro ao criar usuário.',
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        mensagem: 'E-mail e senha são obrigatórios.',
      });
    }

    const usuario = await Usuario.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(401).json({
        mensagem: 'E-mail ou senha incorretos.',
      });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        mensagem: 'E-mail ou senha incorretos.',
      });
    }

    res.json({
      mensagem: 'Login realizado com sucesso.',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensagem: 'Erro ao realizar login.',
    });
  }
});

module.exports = router;