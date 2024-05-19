const express = require('express')
const app = express();
const cors = require('cors')
// const multer = require('multer')

require("./config/database")
require('dotenv').config()
// Enable CORS for all routes
app.use(cors());

app.use(express.json())


const job_route = require("./routes/job-r");
app.use("/api/jobs", job_route)

const users_route = require("./routes/users-r");
app.use("/api/users", users_route)

//If any of the routes path is not found
app.use((req, res) => {
    res.status(404).json({
        message: "Resource not found!"
    })
})

//Backend or Frontend error handler
app.use((err, req, res, next) => {
    let status = 500
    let msg = "Server Error"
    let errors = null
    console.log(err.errors);

    if (err.name == "ValidationError") {
        status = 400;
        msg = "Bad Request"

        let errors_arr = Object.entries(err.errors)
        console.log(errors_arr);
        let temp = []

        errors_arr.forEach(el => {
            let obj = {}
            obj.params = el[0];
            obj.msg = el[1].message
            temp.push(obj)
        })

        errors = temp

    }

    res.status(status).send({ msg: msg, errors })
})

app.listen(8000, () => {
    console.log("Server is running at http://localhost:8000")
})