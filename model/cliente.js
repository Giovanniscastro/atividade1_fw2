const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    nome: String,
    sobrenome:String,
    cpf: Number,
    email: String,
    senha: String,
    Endereco:String,
    Telefone:Number

},
{
    versionKey: false
});

module.exports = mongoose.model("cliente", clienteSchema)