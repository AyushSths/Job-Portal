// const jwt = require("jsonwebtoken")
const express = require("express")
const { fetchjobs, store } = require("../controller/job-c")
const router = express.Router()
// const bodyParser = require("body-parser")

router.get("/", fetchjobs)
router.post("/post", store)


module.exports = router

