const mongoose      = require("mongoose")
const { Schema }    = mongoose

const Produtos = new Schema({

    id_conta:   { type: String, require: true },
    nome:       { type: String, require: true },
    preco:      { type: Number, require: true }

}, {timestamps: true})

module.exports = mongoose.model("Produtos", Produtos)