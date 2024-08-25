const mongoose      = require("mongoose")
const { Schema }    = mongoose

const Conta = new Schema({

    email:          { type: String, require: true },
    senha:          { type: String, require: true },
    nome:           { type: String, require: true }

}, {timestamps: true})

module.exports = mongoose.model("Conta", Conta)