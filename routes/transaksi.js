//import dan implementasi library
const express = require(`express`)
const app = express()
let transaksi = require("../controllers/transaksiController")
let auth = require("../middlewares/authorization")

app.use(express.json()) 

app.get("/", auth.authorization, transaksi.getAllTransaksi)
app.get("/:id", auth.authorization, transaksi.getOneTransaksi)
app.post("/", auth.authorization, transaksi.addTransaksi)
app.delete("/:id", auth.authorization, transaksi.deleteTransaksi)

module.exports = app