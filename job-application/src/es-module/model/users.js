const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const registerSchema = new Schema({
    uname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ["Compnay", "Job-seeker"],
        required: true
    },
})

const loginSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const Register = mongoose.model("register", registerSchema)
const Login = mongoose.model("login", loginSchema)

module.exports = {
    Register,
    Login
}