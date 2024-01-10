const mongoose = require("mongoose")
const express = require("express")
const { User } = require("./mongo")
const cors = require("cors")
const app = express()
const router = express.Router()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())



app.get("/Home", cors(), async (req, res) => {
    let users = await User.find()
    res.send({ data: users })
})


app.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const check = await User.findOne({ email: email })

        if (check) {
            res.json("Logged in")
        }
        else {
            res.json("Error logging in")
        }

    }
    catch (e) {
        res.json("fail")
    }

})

app.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body

    const data = {
        name: name,
        email: email,
        password: password,
        role: role
    }

    try {
        const check = await User.findOne({ email: email })

        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
            await User.insertMany([data])
        }

    }
    catch (e) {
        res.json("fail")
    }
})

// app.post("/cart", async (req, res) => {


// })

const product_route = require("./pro_route");
app.use("/api/products", product_route)

const orders_route = require("./order_route");
app.use("/api/cart", orders_route)

const checkout_route = require("./checkout_route");
app.use("/api/cart/checkout", checkout_route)

app.listen(8000, () => {
    console.log("port connected");
})