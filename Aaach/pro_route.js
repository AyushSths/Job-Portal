const jwt = require("jsonwebtoken")
const express = require("express")
const { fetchProduct, store, update, fetchProduct_id, delete_items } = require("./product")
const router = express.Router()

router.get("/", fetchProduct)
router.get("/:id", fetchProduct_id)
router.put("/:id", update)
router.post("/", store)
router.delete("/:itemId", delete_items)

module.exports = router
