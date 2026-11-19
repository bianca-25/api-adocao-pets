const authService = require('../services/authService');

async function cadastro(req, res) {
  const usuario = await authService.cadastrar(req.body);
  res.status(201).json(usuario);
}

async function login(req, res) {
  const resultado = await authService.login(req.body);
  res.status(200).json(resultado);
}

function perfil(req, res) {
  res.status(200).json(authService.perfil(req.usuarioId));
}

module.exports = { cadastro, login, perfil };