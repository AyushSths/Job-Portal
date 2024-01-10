const express = require("express")
const { fetchOrder, order, updated_quantity, delete_items } = require("./order")
// const Joi = require("joi")
// const validateSchema = require("../middleware/validateSchema")
// const { isBuyer, checkAuthenctication } = require("../middleware/checkAuthentication")

const router = express.Router()

router.post("/", order)
router.get("/", fetchOrder)
router.put("/:itemId", updated_quantity)
router.delete("/:itemId", delete_items)

module.exports = router