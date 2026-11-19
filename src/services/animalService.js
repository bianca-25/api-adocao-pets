const animalModel = require('../models/animalModel');
const AppError = require('../utils/AppError');

function validar({ nome, especie, idade } = {}) {
  for (const [campo, valor] of Object.entries({ nome, especie })) {
    if (typeof valor !== 'string' || valor.trim() === '') {
      throw new AppError(400, `Campo obrigatório ausente: ${campo}`);
    }
  }
  if (idade === undefined || idade === null || idade === '') {
    throw new AppError(400, 'Campo obrigatório ausente: idade');
  }
  if (typeof idade !== 'number' || !Number.isInteger(idade)) {
    throw new AppError(400, 'Idade deve ser um número inteiro');
  }
  if (idade < 0) {
    throw new AppError(400, 'Idade não pode ser negativa');
  }
}

function limpar({ nome, especie, idade, descricao }) {
  return {
    nome: nome.trim(),
    especie: especie.trim(),
    idade,
    descricao: typeof descricao === 'string' ? descricao.trim() : null,
  };
}

function listar() {
  return animalModel.listar();
}

function detalhar(id) {
  const animal = animalModel.buscarPorId(id);
  if (!animal) throw new AppError(404, 'Animal não encontrado');
  return animal;
}

function criar(dados, usuarioId) {
  validar(dados);
  // o dono vem do token, nunca do corpo da requisição
  return animalModel.criar({ ...limpar(dados), usuarioId });
}

function atualizar(id, dados) {
  validar(dados);
  return animalModel.atualizar(id, limpar(dados));
}

function remover(id) {
  animalModel.remover(id);
}

module.exports = { listar, detalhar, criar, atualizar, remover };