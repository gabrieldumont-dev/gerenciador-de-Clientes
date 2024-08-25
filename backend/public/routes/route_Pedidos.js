const router        = require("express").Router()
const mongoose      = require("mongoose")
const Pedidos         = require("../models/model_Pedidos")

router.get("/pedidos/:id_cliente", async (req, res) => {
    const response = await Pedidos.find({ id_cliente: req.params.id_cliente })
    res.json(response)
})

router.delete("/pedidos/:id_cliente", async (req, res) => {
    const response = await Pedidos.deleteMany({ id_cliente: req.params.id_cliente })
    res.json(response)
})

module.exports = router