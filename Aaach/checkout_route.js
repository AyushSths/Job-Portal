const jwt = require("jsonwebtoken")
const express = require("express")
const { store, fetchOrder, fetchOrder_id } = require("./checkout")
const router = express.Router()

router.get("/", fetchOrder)
router.get("/:id", fetchOrder_id)
router.post("/", store)

module.exports = router
