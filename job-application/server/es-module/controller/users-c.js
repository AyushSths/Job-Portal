const { Register } = require("../model/Users")
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
// const path = require("path")
// const fs = require("fs")

const fetchregister = async (req, res, next) => {
    let register = await Register.find()
    res.send({ data: register })
}

const fetchlogin = async (req, res, next) => {
    let user = await Register.findOne({ email: req.body.email })
    // console.log(user);

    if (user) {
        let status = await bcrypt.compare(req.body.password, user.password);
        if (status) {

            let obj = { ...user.toObject() }
            // console.log("obj", obj);
            delete obj.password
            var token = jwt.sign(obj, process.env.JWT_SECRET);
            return res.send({ data: obj, token, msg: "Logged in" })
        }
    }
    return res.status(401).send({ msg: "Incorrect email or password." })
}

const store = async (req, res, next) => {
    try {
        // console.log(req.body);
        let hashed_pwd = await bcrypt.hash(req.body.password, 10)
        let user = await Register.create({ ...req.body, password: hashed_pwd })
        res.send(user)
    }
    catch (err) {
        next(err)
        // next() calls another middleware if there is any error in this middleware
        //If a function is passed through next(function) then it search for that middleware that got 4 parameters(err,req,res,next) 
    }
}

module.exports = {
    fetchregister,
    fetchlogin,
    store,
}