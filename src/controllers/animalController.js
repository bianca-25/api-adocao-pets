const animalService = require('../services/animalService');

function listar(req, res) {
  res.status(200).json(animalService.listar());
}

function detalhar(req, res) {
  res.status(200).json(animalService.detalhar(req.params.id));
}

function criar(req, res) {
  res.status(201).json(animalService.criar(req.body, req.usuarioId));
}

function atualizar(req, res) {
  res.status(200).json(animalService.atualizar(req.animal.id, req.body));
}

function remover(req, res) {
  animalService.remover(req.animal.id);
  res.status(204).send();
}

module.exports = { listar, detalhar, criar, atualizar, remover };