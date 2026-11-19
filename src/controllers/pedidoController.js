const pedidoService = require('../services/pedidoService');

function criar(req, res) {
  const pedido = pedidoService.criar(Number(req.params.id), req.usuarioId, req.body);
  res.status(201).json(pedido);
}

function listarMeus(req, res) {
  res.status(200).json(pedidoService.listarMeus(req.usuarioId));
}

function listarDoAnimal(req, res) {
  res.status(200).json(pedidoService.listarDoAnimal(req.animal.id));
}

function cancelar(req, res) {
  pedidoService.cancelar(req.params.id, req.usuarioId);
  res.status(204).send();
}

function decidir(req, res) {
  res.status(200).json(pedidoService.decidir(req.params.id, req.usuarioId, req.body));
}

module.exports = { criar, listarMeus, listarDoAnimal, cancelar, decidir };