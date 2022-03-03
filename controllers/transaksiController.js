//import library
const { request, response } = require("express");
const req = require("express/lib/request");

//memanggil file model transaksi dan produk
let transaksi = require("../models/index").transaksi
let product = require("../models/index").product

exports.getAllTransaksi = (req, res) => {
    transaksi.findAll({
        include: [
            "admin","product"
        ]
    })
    .then(result => {
        return res.json(result)
    })
    .catch(error => {
        message: error.message
    })
}

exports.getOneTransaksi = (req, res) => {
    transaksi.findOne({ 
        where: {transaksi_id: req.params.id},
        include: [
            "admin","product"
        ]
    })
    .then(result => {
        res.json({
            transaksi: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
}

exports.addTransaksi = (req, res) => {
    //tampung data request
    let current = new Date().toISOString().split('T')[0]
    let data = {
        admin_id: req.body.admin_id,
        customer_name: req.body.customer_name,
        customer_phone: req.body.customer_phone,
        product_id: req.body.product_id,
        qty: req.body.qty,
        waktu: current
    }
    let idProduct = { product_id: req.body.product_id };
    product
        .findOne({where: idProduct})
        .then(result => {
            let currStock = result.stock;
            let newStock = { stock: currStock - req.body.qty };
            product.update(newStock, { where: idProduct });
        })
        .catch(error => {
            res.json({
                message: error.message
            });
    });
    transaksi.create(data)
    .then(result => {
        return res.json({
            message: "data has been inserted"
        })
    })
    .catch(error => {
        message: error.message
    })
}

exports.deleteTransaksi = (req, res) => {
    let id = req.params.id

    transaksi.destroy({where: {transaksi_id: id}})
    .then(result => {
        return res.json({
            message: "data has been deleted"
        })
    })
    .catch(error => {
        return res.json({
            message: error.message
        })
    })
}