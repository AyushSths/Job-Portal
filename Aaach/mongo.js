const mongoose = require("mongoose")
const express = require("express")
const app = express()
app.use(express.json())
const router = express.Router()
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

mongoose.connect("mongodb://0.0.0.0:27017/Aaach")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log('failed');
    })

// const auth_route = require("./route/auth")
// app.use("/api", auth_route)

// // const product_route = require("./route/product");
// // app.use("/api/products", product_route)

// app.listen(8000, () => {
//     console.log("port connected");
// })


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

const productSchema = new Schema({

    name: {
        type: String,
        maxlength: 255,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        default: 0
    },
    description: {
        type: String,
    },
    //Embeded document
    images: {
        type: [String]  // store path of our images
    },
    categories: {
        type: [String]
    },
    brand: {
        type: [String]
    },
    rating: {
        rate: { type: Number },
        count: { type: Number }
    },
    // productId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Product',
    //     required: true
    // }
})
const cartSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    categories: {
        type: [String]
    },
    brand: {
        type: [String]
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "rejected"],
        default: "pending"
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    images: {
        type: [String]  // store path of our images
    },
    // email: {
    //     type: String,
    //     required: true
    // },
    quantity: {
        type: Number,
        required: true
    },
});

const checkoutSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    com_name: {
        type: String,
    },
    country: {
        type: String,
        // required: true
    },
    town: {
        type: String,
        // required: true
    },
    state: {
        type: String,
    },
    postcode: {
        type: Number,
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
    },
    payment: {
        type: String,
    },
    cartDetails: {
        type: [cartSchema],
    },
    total: {
        type: Number
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "rejected"],
        default: "pending"
    },
    // products: {
    //     name: {
    //         type: String,
    //         required: true,
    //     },
    //     price: {
    //         type: Number,
    //         min: 0,
    //         required: true,
    //     },
    //     categories: {
    //         type: [String]
    //     },
    //     brand: {
    //         type: [String]
    //     },
    //     status: {
    //         type: String,
    //         enum: ["pending", "shipped", "rejected"],
    //         default: "pending"
    //     },
    //     productId: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Product',
    //         required: true
    //     },
    //     userId: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'User',
    //         required: true
    //     },
    //     username: {
    //         type: String,
    //         required: true
    //     },
    //     images: {
    //         type: [String]  // store path of our images
    //     },
    //     quantity: {
    //         type: Number,
    //         required: true
    //     },

    // }
});


const User = mongoose.model("Users", userSchema)
const Product = mongoose.model("Product", productSchema)
const Cart = mongoose.model("Cart", cartSchema)
const Checkout = mongoose.model("Checkout", checkoutSchema)

module.exports = {
    User,
    Product,
    Cart,
    Checkout
};






