// Garante que erros em funções async cheguem ao middleware de erro
module.exports = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);