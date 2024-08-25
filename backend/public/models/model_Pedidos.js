const mongoose      = require("mongoose")
const { Schema }    = mongoose

const Pedidos = new Schema({

    id_conta:   { type: String, require: true },
    id_cliente: { type: String, require: true },
    data:       { type: Date, require: true },
    produtos:   { type: Array, require: true },
    total:      { type: Number, require: true }

}, {timestamps: true})

module.exports = mongoose.model("Pedidos", Pedidos)