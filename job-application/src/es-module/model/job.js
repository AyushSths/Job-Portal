const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const jobsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categorey: {
        type: String,
        required: true
        // enum: ["accounting Finance", "graphic designer", "informationTechnology", "education / training", "research / consultancy", "human resource", "medical / pharmacy"]
    },
    company: {
        type: String
    },
    jobLevel: {
        type: String,
        enum: ["fresher", "junior", "mid", "senior"],
        required: true,
        set: function (value) {
            return value.toLowerCase()
        }
    },
    description: {
        type: String,
        required: true
    },
    noOfVacancy: {
        type: Number,
        default: 1,
        required: true
    },
    location: {
        type: String
    },
    offeredSalary: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ["top", "hot", "featured", "normal"],
        required: true,
        set: function (value) {
            return value.toLowerCase()
        }
    },
    createdAt: {
        type: Date,
        required: true
    },
    // createdBy: {
    //     type: String,
    //     required: true
    // },
    image: {
        type: [String]
    }
})

const Job = mongoose.model("jobs", jobsSchema)

module.exports = {
    Job
}