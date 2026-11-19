const router = require('express').Router();
const autenticar = require('../middlewares/autenticar');
const verificarDonoAnimal = require('../middlewares/verificarDonoAnimal');
const animalController = require('../controllers/animalController');
const pedidoController = require('../controllers/pedidoController');

// aberto
router.get('/', animalController.listar);
router.get('/:id', animalController.detalhar);

// logado
router.post('/', autenticar, animalController.criar);
router.post('/:id/pedidos', autenticar, pedidoController.criar);

// dono do animal
router.put(
  '/:id',
  autenticar,
  verificarDonoAnimal('Sem permissão para alterar este animal'),
  animalController.atualizar
);
router.delete(
  '/:id',
  autenticar,
  verificarDonoAnimal('Sem permissão para remover este animal'),
  animalController.remover
);
router.get(
  '/:id/pedidos',
  autenticar,
  verificarDonoAnimal('Sem permissão para ver os pedidos deste animal'),
  pedidoController.listarDoAnimal
);

module.exports = router;