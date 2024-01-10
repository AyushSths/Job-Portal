const { Checkout } = require("./mongo")

const fetchOrder = async (req, res, next) => {
    let orders = await Checkout.find()
    res.send({ data: orders })
}

const fetchOrder_id = async (req, res, next) => {
    let order = await Checkout.findById(req.params.id)
    res.send({ data: order })
    // console.log({ data: products })
}

const store = async (req, res) => {
    try {
        const { fname, lname, com_name, country, town, state, postcode, phone, email, payment, cartDetails, total, status } = req.body
        let newCheckout = {
            fname: fname,
            lname: lname,
            com_name: com_name,
            country: country,
            town: town,
            state: state,
            postcode: postcode,
            phone: phone,
            email: email,
            payment: payment,
            cartDetails: cartDetails,
            total: total,
            status: status
        };
        await Checkout.insertMany([newCheckout])
        return res.status(201).json({ message: "checkout created" })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Server error')
    }
}
module.exports = { store, fetchOrder, fetchOrder_id };

