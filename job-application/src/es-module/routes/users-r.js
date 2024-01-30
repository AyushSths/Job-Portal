// const jwt = require("jsonwebtoken")
const express = require("express")
const { fetchregister, store, fetchlogin } = require("../controller/users-c")
const router = express.Router()
const Joi = require("joi")
const validateSchema = require("../middleware/validateSchema")

const signupSchema = Joi.object({
    uname: Joi.string()
        .max(255)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required(),
    education: Joi.string()
        .required(),
    company: Joi.string()
        .required(),
    contact: Joi.string()
        .required(),
    role: Joi.string()
        .required(),

})
const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required(),

})
router.get("/", fetchregister)
router.post("/register", validateSchema(signupSchema), store)
router.post("/login", validateSchema(loginSchema), fetchlogin)


module.exports = router

