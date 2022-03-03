const { request, response } = require("express");
let jwt = require("jsonwebtoken")
exports.authorization = (request, response, next) => {
    // token dikiri melalui header
    let header = request.headers.authorization
    let token = header && header.split(" ")[1]

    //jika tidak menginput token
    if (token == null) { 
        return response.json({
            message: `unauthorized`
        })
    } else {
        let secretKey = "ChallengeNodeJS"
        jwt.verify(token, secretKey, (error, admin) => {
            if (error) {
                return response.json({
                    message: "Invalid Token"
                })
            }
            else{
                next()
            }
        })
    }
}