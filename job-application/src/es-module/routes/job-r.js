// const jwt = require("jsonwebtoken")
const express = require("express")
const { fetchjobs, store, fetchjobs_id } = require("../controller/job-c")
const router = express.Router()
// const bodyParser = require("body-parser")

router.get("/", fetchjobs)
router.get("/:id", fetchjobs_id)
router.post("/post", store)


module.exports = router

