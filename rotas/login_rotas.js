const express = require('express');
const clienteController = require('../controller/cliente_controller')

const router = express.Router();
//Rota do recurso: "/api/login"

router.post('/', clienteController.validarcliente);

module.exports = router;