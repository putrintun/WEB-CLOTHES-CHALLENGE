//import da implementasi library
const express = require("express")
const app = express()
let product = require("../controllers/productController")
let uploadImg = require("../middlewares/uploadImg")
let auth = require("../middlewares/authorization")

app.use(express.json())

app.get("/", auth.authorization, product.getAllProduct)
app.get("/:id", auth.authorization, product.getOneProduct)
app.post("/", auth.authorization, uploadImg.upload.single("image"), product.addProduct)
app.put("/:id", auth.authorization, uploadImg.upload.single("image"), product.editProduct)
app.delete("/:id", auth.authorization, uploadImg.upload.single("image"), product.deleteProduct)

module.exports = app