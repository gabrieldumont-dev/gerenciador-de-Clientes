const express           = require("express")
const cors              = require("cors")
const app               = express()

app.use(cors())
app.use(express.json())

app.listen(3000, function() {
    console.log("Servidor online: http://localhost:3000")
})

const conn = require("./bd/conn")
conn()

const defauult = require("./public/routes/route_Default")
app.use("/", defauult)

const conta = require("./public/routes/route_Conta")
app.use("/", conta)

const pedidos = require("./public/routes/route_Pedidos")
app.use("/", pedidos)