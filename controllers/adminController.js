//import library 
const md5 = require("md5")
const { req, res } = require("express")
let jwt = require("jsonwebtoken")

//memanggil file model admin
let admin = require("../models/index").admin

exports.getAllAdmin = (req, res) => {
    admin.findAll()
    .then(result => {
        return res.json(result)
    })
    .catch(error => {
        message: error.message
    })
}

exports.getOneAdmin = (req, res) => {
    admin.findOne({ where: {admin_id: req.params.id}})
    .then(result => {
        res.json({
            admin: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
}

exports.addAdmin = (req, res) => {
    let data = {
        name : req.body.name,
        username : req.body.username,
        password : md5(req.body.password)
    }

    admin.create(data)
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

exports.editAdmin = (req, res) => {
    let id = req.params.id
    let data = {
        name : req.body.name,
        username : req.body.username,
        password : md5(req.body.password)
    }

    admin.update(data, {where:{admin_id: id}})
    .then(result => {
        return res.json({
            message: "data has been updated"
        })
    })
    .catch(error => {
        return res.json({
            message: error.message
        })
    })
}

exports.deleteAdmin = (req, res) => {
    let id = req.params.id

    admin.destroy({where:{admin_id :id}})
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

exports.authentication = async(req, res) => {
    let data = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    //validasi (cek data di tabel karyawan)
    let result = await admin.findOne({where: data})

    if (result) {
        // data ditemukan

        // payload = data/informasi yg akan dienkripsi
        let payload = JSON.stringify(result) // koversi bentuk objek -> JSON
        let secretKey = "ChallengeNodeJS"

        // generate token
        let token = jwt.sign(payload, secretKey)
        return res.json({
            logged: true,
            token: token
        })
    } else{
        // data tidak ditemukan
        return res.json({
            logged: false,
            message: `invalid username or password`
        })
    }
}