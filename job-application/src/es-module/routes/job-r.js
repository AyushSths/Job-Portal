// const jwt = require("jsonwebtoken")
const express = require("express")
const { fetchjobs, store, fetchjobs_id, update } = require("../controller/job-c")
const router = express.Router()
const { checkAuthenctication } = require("../middleware/checkAuthentication")
// const bodyParser = require("body-parser")

router.get("/", fetchjobs)
router.get("/:id", fetchjobs_id)
router.post("/post", store)
router.put("/edit/:id", update)


module.exports = router

