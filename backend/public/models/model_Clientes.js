const mongoose      = require("mongoose")
const { Schema }    = mongoose

const Clientes = new Schema({

    id_conta:   { type: String, require: true },
    nome:       { type: String, require: true },
    email:      { type: String, require: true },
    telefone:   { type: String, require: true }

}, {timestamps: true})

module.exports = mongoose.model("Clientes", Clientes)