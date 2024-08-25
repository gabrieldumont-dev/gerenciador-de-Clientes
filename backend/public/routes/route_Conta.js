const router        = require("express").Router()
const mongoose      = require("mongoose")
const Conta         = require("../models/model_Conta")

router.post("/conta", async (req, res) => {
    const verifyEmail = await Conta.findOne({ email: req.body.email })
    if (verifyEmail == null){
        const response = await Conta.create(req.body)
        res.json(response)
    } else {
        res.json({ msg: "Este e-mail já esta em uso!" })
    }
})

router.get("/conta/:email/:senha", async (req, res) => {
    const verifyEmail = await Conta.findOne({ email: req.params.email })
    if (verifyEmail == null){
        res.json({ msg: "E-mail não cadastrado!" })
    } else {
        if (verifyEmail.senha == req.params.senha){
            res.json(verifyEmail)
        } else {
            res.json({ msg: "Senha incorreta!" })
        }
    }
})

module.exports = router