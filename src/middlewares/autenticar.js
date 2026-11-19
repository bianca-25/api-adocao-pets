const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

// Rotas "logado": exige o header  Authorization: Bearer <token>
module.exports = (req, res, next) => {
  const [tipo, token] = (req.headers.authorization || '').split(' ');
  if (tipo !== 'Bearer' || !token) {
    throw new AppError(401, 'Token ausente ou inválido');
  }
  try {
    req.usuarioId = jwt.verify(token, process.env.JWT_SECRET).id;
    next();
  } catch {
    throw new AppError(401, 'Token ausente ou inválido');
  }
};