//import library
let path = require("path")
let fs = require("fs")

//memanggil file model product
let product = require("../models/index").product

exports.getAllProduct = (req, res) => {
    product.findAll()
    .then(result =>  {
        return res.json(result)
    })
    .catch(error => {
        return res.json({
            message: error.message
        })
    })
}

exports.getOneProduct = (req, res) => {
    product.findOne({ where: {product_id: req.params.id}})
    .then(result => {
        res.json({
            product: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
}

exports.addProduct = (req, res) => {
    if (!req.file) {
        res.json({
            message: "no uploaded file"
        })
    } else {
        let data = {
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            image: req.file.filename,
            stock: req.body.stock
        }
        product.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    }
}

exports.editProduct = (req, res) => {
    let param = { product_id: req.params.id}
    let data = {
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        stock: req.body.stock
    }
    if (req.file) {
        // get data by id
        const row = product.findOne({where: param})
        .then(result => {
            let oldFileName = result.image
            // delete old file
            let dir = path.join(__dirname,"../image",oldFileName)
            fs.unlink(dir, err => console.log(err))
        })
        .catch(error => {
            console.log(error.message);
        })
        // set new filename
        data.image = req.file.filename
    }
    product.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
}

exports.deleteProduct = async(req, res) => {
    try {
        let param = { product_id: req.params.id}
        let result = await product.findOne({where: param})
        let oldFileName = result.image
           
        // delete old file
        let dir = path.join(__dirname,"../image",oldFileName)
        fs.unlink(dir, err => console.log(err))

        // delete data
        product.destroy({where: param})
        .then(result => {
           
            res.json({
                message: "data has been deleted",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}