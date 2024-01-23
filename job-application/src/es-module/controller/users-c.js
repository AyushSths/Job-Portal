const { Register } = require("../model/users")
const { Login } = require("../model/users")
// const path = require("path")
// const fs = require("fs")

const fetchregister = async (req, res, next) => {
    let register = await Register.find()
    res.send({ data: register })
}

const fetchlogin = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const check = await Register.findOne({ email: email })

        if (check) {
            res.json("Logged in")
        }
        else {
            res.json("Error logging in")
        }

    }
    catch (e) {
        res.json("fail")
        console.log("fail", e)
    }
}

// const fetchjobs_id = async (req, res, next) => {
//     let jobs = await Job.findById(req.params.id)
//     res.send({ data: jobs })
// }

const store = async (req, res, next) => {
    try {
        const { uname, email, password, contact, role, company, education } = req.body;
        if (!uname || !email || !password || !contact || !company || !role || !education) {
            return res.status(400).json({ error: 'Missing required fields in the request body' });
        }
        const users = new Register({
            uname: uname,
            email: email,
            password: password,
            contact: contact,
            role: role,
            company: company,
            education: education,
        });

        // Check if the job already exists in the chart
        const existingUser = await Register.findOne({ email: email });

        if (existingUser) {
            res.status(200).json({ message: 'Email is already taken' });
        } else {
            res.status(201).json({ message: 'Register successfull' });
            await Register.insertMany([users])
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    fetchregister,
    fetchlogin,
    store,
}