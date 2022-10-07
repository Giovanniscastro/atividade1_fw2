const jwt = require('jsonwebtoken')
const cliente = require('../model/cliente');

exports.listar = (req, res) => {
    cliente.find({}, (err, cliente) =>{ 
        if(err) {
            res.status(500).json({Erro: err})
        }
        else {
            res.status(200).json(cliente);
        }
    })
}

,

exports.inserir = (req, res) => {
    const clienteRequest = req.body;
    if(clienteRequest && clienteRequest.nome && clienteRequest.sobrenome&& clienteRequest.cpf 
        && clienteRequest.email && clienteRequest.senha&& clienteRequest.Endereco && clienteRequest.Telefone ) {

        const clienteNovo = new cliente(clienteRequest);
        clienteNovo.save((err, clienteSalvo) => {
            if(err) {
                res.status(500).json({Erro: err})
            }
            else {
                return res.status(201).json(clienteSalvo);
            }
        })
        
    }
    else {
        return res.status(400).json({
            Erro:"Nome ,email e/ou cpf sao obrigatorios"
        })
    }
}

exports.buscarPorId = (req, res) => {
    const id = req.params.id;

    cliente.findById(id, (err, clienteEncontrado) => {
        if(err) {
            res.status(500).json({Erro: err}); 
        }
        else if(clienteEncontrado) {
            return res.json(clienteEncontrado);
        }
        else {
            return res.status(404).json(
                { Erro: "cliente nao encontrado" }
            )
        }
    
    })
}

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const clienteRequest = req.body;

    if(!clienteRequest || !clienteRequest.nome  || !clienteRequest.cpf
        || !clienteRequest.email) {
        return res.status(400).json({
            Erro:"Nome ,email ou cpf sao obrigatorios"
        });    
    }

    cliente.findByIdAndUpdate(id, clienteRequest, {new: true}, 
        (err, clienteAtualizado) => {
            if(err) {
                res.status(500).json({Erro: err}); 
            }
            else if(clienteAtualizado) {
                return res.json(clienteAtualizado);
            }
            else {
                return res.status(404).json(
                    { Erro: "cliente nao encontrado" }
                )
            }
        })
    }

exports.deletar = (req, res) => {
    const id = req.params.id;

    cliente.findByIdAndDelete(id, (err, clienteDeletado) => {
        if(err) {
            return res.status(500).json({Erro: err}); 
        }
        else if(clienteDeletado) {
            return res.json(clienteDeletado);
        }
        else {
            return res.status(404).json(
                { Erro: "cliente nao encontrado" }
            )    
        }
    })    
}

exports.buscarcliente = (req, res) => {
    if(req.query && req.query.cpf) {
        const paramcpf = req.query.cpf;
        cliente.findOne({cpf: paramcpf}, (err, clienteEncontrado) => {
            if(err) {
                return res.status(500).json({Erro: err}); 
            }
            else if(clienteEncontrado) {
                return res.json(clienteEncontrado);
            }
            else {
                return res.status(404).json(
                    { Erro: "cliente nao encontrado" }
                )    
            }    
        })
    }
    else {
        res.status(400).json({Erro: "Faltou o parametro cpf"});
    }
}

exports.validarcliente = (req, res) => {
    if(req.body && req.body.cpf && req.body.senha) {
        const cpfcliente = req.body.cpf;
        const senhacliente = req.body.senha;
        
        cliente.findOne({cpf: cpfcliente}, (err, clienteEncontrado) => {
            if(err) {
                return res.status(500).json({Erro: err}); 
            }
            else if(clienteEncontrado && clienteEncontrado.senha == senhacliente) {
                const token = jwt.sign( {
                    id: clienteEncontrado.id                    
                }, '1234344', { expiresIn: "2h"});
                res.status(201).json({token: token});
            }
            else {
                res.status(401).json({Erro: "cliente ou senha invalidos"});
            }    
        })
    }
    else {
        res.status(400).json({Erro: "Parametros invalidos"});
    }   
}