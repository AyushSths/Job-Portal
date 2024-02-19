const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const registerSchema = new Schema({
    uname: {
        type: String,
        maxlength: 25,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: async function (value) {
                // console.log(value);
                let exists = await mongoose.models.register.findOne({ email: value })
                // console.log("email", exists)
                if (exists)
                    return false
            },
            message: "E-mail already in use"
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["company", "job-seeker"],
        required: true,
        set: function (value) {
            return value.toLowerCase()
        }
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
        type: String,
        required: true,
        maxlength: 10,
        minlength: 10
    },
})


const Register = mongoose.model("register", registerSchema)


module.exports = {
    Register,

}