const express = require('express');
const clienteController = require('../controller/cliente_controller')

const router = express.Router();

//Rota do recurso: "/api/CLientes"

router.get('/', clienteController.listar)
router.post('/', clienteController.inserir)
router.get('/busca', clienteController.buscarcliente)
router.get('/:id', clienteController.buscarPorId)
router.put('/:id', clienteController.atualizar)
router.delete('/:id', clienteController.deletar)

module.exports = router;