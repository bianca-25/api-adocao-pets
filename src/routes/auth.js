const router = require('express').Router();
const asyncHandler = require('../utils/asyncHandler');
const autenticar = require('../middlewares/autenticar');
const controller = require('../controllers/authController');

router.post('/cadastro', asyncHandler(controller.cadastro)); // aberto
router.post('/login', asyncHandler(controller.login)); // aberto
router.get('/perfil', autenticar, controller.perfil); // logado

module.exports = router;