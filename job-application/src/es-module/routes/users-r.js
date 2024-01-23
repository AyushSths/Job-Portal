// const jwt = require("jsonwebtoken")
const express = require("express")
const { fetchregister, store, fetchlogin } = require("../controller/users-c")
const router = express.Router()
// const bodyParser = require("body-parser")

router.get("/", fetchregister)
router.post("/post", store)
router.post("/login", fetchlogin)


module.exports = router

