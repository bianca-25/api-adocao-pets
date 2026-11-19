const db = require('../database');

function buscarPorId(id) {
  // nunca devolve a senha
  return db.prepare('SELECT id, nome, email FROM usuarios WHERE id = ?').get(id);
}

function buscarPorEmail(email) {
  return db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
}

function criar({ nome, email, senha }) {
  const r = db
    .prepare('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)')
    .run(nome, email, senha);
  return buscarPorId(r.lastInsertRowid);
}

module.exports = { buscarPorId, buscarPorEmail, criar };