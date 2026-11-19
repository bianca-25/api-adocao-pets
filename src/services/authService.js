const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');
const AppError = require('../utils/AppError');

function textoValido(valor) {
  return typeof valor === 'string' && valor.trim() !== '';
}

async function cadastrar({ nome, email, senha } = {}) {
  for (const [campo, valor] of Object.entries({ nome, email, senha })) {
    if (!textoValido(valor)) {
      throw new AppError(400, `Campo obrigatório ausente: ${campo}`);
    }
  }
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    throw new AppError(400, 'E-mail inválido');
  }
  if (senha.length < 6) {
    throw new AppError(400, 'A senha deve ter pelo menos 6 caracteres');
  }

  const emailLimpo = email.trim().toLowerCase();
  if (usuarioModel.buscarPorEmail(emailLimpo)) {
    throw new AppError(400, 'E-mail já cadastrado');
  }

  const hash = await bcrypt.hash(senha, 10);
  return usuarioModel.criar({ nome: nome.trim(), email: emailLimpo, senha: hash });
}

async function login({ email, senha } = {}) {
  if (!textoValido(email) || !textoValido(senha)) {
    throw new AppError(401, 'E-mail ou senha incorretos');
  }
  const usuario = usuarioModel.buscarPorEmail(email.trim().toLowerCase());
  const senhaOk = usuario && (await bcrypt.compare(senha, usuario.senha));
  if (!senhaOk) {
    throw new AppError(401, 'E-mail ou senha incorretos');
  }

  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
  return { token };
}

function perfil(usuarioId) {
  const usuario = usuarioModel.buscarPorId(usuarioId);
  if (!usuario) throw new AppError(401, 'Token ausente ou inválido');
  return usuario;
}

module.exports = { cadastrar, login, perfil };