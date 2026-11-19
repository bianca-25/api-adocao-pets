const db = require('../database');

function buscarPorId(id) {
  return db.prepare('SELECT * FROM pedidos_adocao WHERE id = ?').get(id);
}

function buscarPorAnimalEUsuario(animalId, usuarioId) {
  return db
    .prepare('SELECT * FROM pedidos_adocao WHERE animalId = ? AND usuarioId = ?')
    .get(animalId, usuarioId);
}

function listarPorUsuario(usuarioId) {
  return db
    .prepare('SELECT * FROM pedidos_adocao WHERE usuarioId = ? ORDER BY id')
    .all(usuarioId);
}

function listarPorAnimal(animalId) {
  return db
    .prepare('SELECT * FROM pedidos_adocao WHERE animalId = ? ORDER BY id')
    .all(animalId);
}

function criar({ mensagem, animalId, usuarioId }) {
  const r = db
    .prepare('INSERT INTO pedidos_adocao (mensagem, animalId, usuarioId) VALUES (?, ?, ?)')
    .run(mensagem, animalId, usuarioId);
  return buscarPorId(r.lastInsertRowid);
}

function remover(id) {
  db.prepare('DELETE FROM pedidos_adocao WHERE id = ?').run(id);
}

// Aprovar muda o pedido E o animal juntos (transação: ou faz os dois, ou nenhum)
const aprovar = db.transaction((pedidoId, animalId) => {
  db.prepare("UPDATE pedidos_adocao SET status = 'aprovado' WHERE id = ?").run(pedidoId);
  db.prepare("UPDATE animais SET status = 'adotado' WHERE id = ?").run(animalId);
  return buscarPorId(pedidoId);
});

function recusar(pedidoId) {
  db.prepare("UPDATE pedidos_adocao SET status = 'recusado' WHERE id = ?").run(pedidoId);
  return buscarPorId(pedidoId);
}

module.exports = {
  buscarPorId,
  buscarPorAnimalEUsuario,
  listarPorUsuario,
  listarPorAnimal,
  criar,
  remover,
  aprovar,
  recusar,
};