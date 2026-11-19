const animalModel = require('../models/animalModel');
const AppError = require('../utils/AppError');

// Rotas "dono": só quem cadastrou o animal passa.
// Recebe a mensagem do 403 para cada rota ter a sua.
module.exports = (mensagem403) => (req, res, next) => {
  const animal = animalModel.buscarPorId(req.params.id);
  if (!animal) throw new AppError(404, 'Animal não encontrado');
  if (animal.usuarioId !== req.usuarioId) throw new AppError(403, mensagem403);
  req.animal = animal;
  next();
};