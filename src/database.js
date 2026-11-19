const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '..', 'adocao.db'));
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS animais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    especie TEXT NOT NULL,
    idade INTEGER NOT NULL,
    descricao TEXT,
    status TEXT NOT NULL DEFAULT 'disponivel',
    usuarioId INTEGER NOT NULL REFERENCES usuarios(id)
  );

  CREATE TABLE IF NOT EXISTS pedidos_adocao (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mensagem TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pendente',
    animalId INTEGER NOT NULL REFERENCES animais(id) ON DELETE CASCADE,
    usuarioId INTEGER NOT NULL REFERENCES usuarios(id),
    UNIQUE (animalId, usuarioId)
  );
`);

module.exports = db;