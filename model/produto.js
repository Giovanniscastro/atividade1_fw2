const mongoose = require ('mongoose')
const Schema = mongoose.Schema;
// const {Schema}  = mongoose;

const ProdutosSchema = new Schema({
    nome: String,
    preco: Number,
    descricao:String
},
{
    versionKey: false
});

module.exports = mongoose.model("Produtos", ProdutosSchema);