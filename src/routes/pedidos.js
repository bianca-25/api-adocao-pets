const router = require('express').Router();
const autenticar = require('../middlewares/autenticar');
const pedidoController = require('../controllers/pedidoController');

router.get('/', autenticar, pedidoController.listarMeus); // logado
router.delete('/:id', autenticar, pedidoController.cancelar); // dono do pedido
router.put('/:id/status', autenticar, pedidoController.decidir); // dono do animal

module.exports = router;