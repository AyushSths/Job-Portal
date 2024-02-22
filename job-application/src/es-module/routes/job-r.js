// const jwt = require("jsonwebtoken")
const express = require("express")
const { fetchjobs, store, fetchjobs_id, update, fetchSearch, delete_items } = require("../controller/job-c")
const router = express.Router()
const { checkAuthenctication } = require("../middleware/checkAuthentication")
// const bodyParser = require("body-parser")

router.get("/", fetchjobs)
router.get("/search", fetchSearch)
router.get("/:id", fetchjobs_id)
router.post("/post", store)
router.put("/edit/:id", update)
router.delete("/:id", delete_items)


module.exports = router

