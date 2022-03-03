//import dan implementasi library
const express = require(`express`)
const app = express()
let admin = require("../controllers/adminController")
let auth = require("../middlewares/authorization")

app.use(express.json()) 

app.get("/", auth.authorization, admin.getAllAdmin)
app.get("/:id", auth.authorization, admin.getOneAdmin)
app.post("/", admin.addAdmin)
app.put("/:id", auth.authorization, admin.editAdmin)
app.delete("/:id", auth.authorization, admin.deleteAdmin)
app.post("/auth", admin.authentication)

module.exports = app