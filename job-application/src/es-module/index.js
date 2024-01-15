const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')

// Enable CORS for all routes
app.use(cors());

const db = "mongodb+srv://ayushsthx088:mongo3d2y@cluster0.nmse8gp.mongodb.net/portal-db?retryWrites=true&w=majority"

app.use(express.json())
mongoose.connect(db).then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.log("Error while connecting", err)
})

// app.get('/', function (req, res) {
//     res.send('Hello World')
// })

const job_route = require("./routes/job-r");
app.use("/api/jobs", job_route)

app.listen(8000, () => {
    console.log("Server is running at http://localhost:8000")
})