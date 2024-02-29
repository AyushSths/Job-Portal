const express = require('express')
const app = express();
const cors = require('cors')
// const multer = require('multer')

require("./config/database")
require('dotenv').config()
// Enable CORS for all routes
app.use(cors(
    {
        origin: ["https://job-portal-ayush-chi.vercel.app/"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
));
app.use(express.json())


const job_route = require("./routes/job-r");
app.use("/api/jobs", job_route)

const users_route = require("./routes/users-r");
app.use("/api/users", users_route)

// Set up Multer for handling file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads'); // Uploads will be stored in the 'uploads' directory
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname); // Unique filename to avoid overwriting
//     },
// });

// const upload = multer({ storage });

// // Use Multer middleware for the '/upload' endpoint
// app.post('/api/jobs/post', upload.array('image', 3), async (req, res, next) => {
//     console.log('Received request to /api/jobs/post:', req.body);
//     try {
//         // Save image information to MongoDB or handle as needed
//         const imageUrl = `/uploads/${req.file.filename}`;
//         // ... additional logic to save image URL to the database

//         res.json({ success: true, message: 'Image uploaded successfully', imageUrl });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// });

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