const animalModel = require('../models/animalModel');
const pedidoModel = require('../models/pedidoModel');
const AppError = require('../utils/AppError');

function criar(animalId, usuarioId, { mensagem } = {}) {
  const animal = animalModel.buscarPorId(animalId);
  if (!animal) throw new AppError(404, 'Animal não encontrado');

  if (typeof mensagem !== 'string' || mensagem.trim() === '') {
    throw new AppError(400, 'Campo obrigatório ausente: mensagem');
  }
  if (animal.usuarioId === usuarioId) {
    throw new AppError(400, 'Você não pode pedir a adoção do seu próprio animal');
  }
  if (animal.status === 'adotado') {
    throw new AppError(400, 'Este animal já foi adotado');
  }
  if (pedidoModel.buscarPorAnimalEUsuario(animalId, usuarioId)) {
    throw new AppError(400, 'Você já fez um pedido para este animal');
  }

  return pedidoModel.criar({ mensagem: mensagem.trim(), animalId, usuarioId });
}

function listarMeus(usuarioId) {
  return pedidoModel.listarPorUsuario(usuarioId);
}

function listarDoAnimal(animalId) {
  return pedidoModel.listarPorAnimal(animalId);
}

// "dono" aqui é quem FEZ o pedido
function cancelar(id, usuarioId) {
  const pedido = pedidoModel.buscarPorId(id);
  if (!pedido) throw new AppError(404, 'Pedido não encontrado');
  if (pedido.usuarioId !== usuarioId) {
    throw new AppError(403, 'Sem permissão para cancelar este pedido');
  }
  pedidoModel.remover(id);
}

// "dono" aqui é o dono do ANIMAL
function decidir(id, usuarioId, { status } = {}) {
  if (status !== 'aprovado' && status !== 'recusado') {
    throw new AppError(400, 'Status deve ser aprovado ou recusado');
  }

  const pedido = pedidoModel.buscarPorId(id);
  if (!pedido) throw new AppError(404, 'Pedido não encontrado');

  const animal = animalModel.buscarPorId(pedido.animalId);
  if (animal.usuarioId !== usuarioId) {
    throw new AppError(403, 'Sem permissão para decidir sobre este pedido');
  }
  if (pedido.status !== 'pendente') {
    throw new AppError(400, 'Este pedido já foi decidido');
  }

  if (status === 'aprovado') {
    if (animal.status === 'adotado') {
      throw new AppError(400, 'Este animal já foi adotado');
    }
    return pedidoModel.aprovar(pedido.id, animal.id);
  }
  return pedidoModel.recusar(pedido.id);
}

module.exports = { criar, listarMeus, listarDoAnimal, cancelar, decidir };