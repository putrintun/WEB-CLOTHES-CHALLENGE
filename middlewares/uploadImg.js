//import multer
const multer = require("multer")
const path = require("path")
const fs = require("fs")

//config storage image
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"./image")
    },
    filename: (req,file,cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
exports.upload = multer({storage: storage})