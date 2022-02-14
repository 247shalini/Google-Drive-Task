// const { status } = require("express/lib/response");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");

const authorize = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        console.log(token);

        const user = UserModel.findOne({_id:verify})
        next();
    } catch (error) {
        res.status(401).send(error);
    }
}

module.exports = authorize;