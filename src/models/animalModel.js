const db = require('../database');

function listar() {
  return db.prepare('SELECT * FROM animais ORDER BY id').all();
}

function buscarPorId(id) {
  return db.prepare('SELECT * FROM animais WHERE id = ?').get(id);
}

function criar({ nome, especie, idade, descricao, usuarioId }) {
  const r = db
    .prepare(
      'INSERT INTO animais (nome, especie, idade, descricao, usuarioId) VALUES (?, ?, ?, ?, ?)'
    )
    .run(nome, especie, idade, descricao, usuarioId);
  return buscarPorId(r.lastInsertRowid);
}

function atualizar(id, { nome, especie, idade, descricao }) {
  db.prepare(
    'UPDATE animais SET nome = ?, especie = ?, idade = ?, descricao = ? WHERE id = ?'
  ).run(nome, especie, idade, descricao, id);
  return buscarPorId(id);
}

function remover(id) {
  db.prepare('DELETE FROM animais WHERE id = ?').run(id);
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };