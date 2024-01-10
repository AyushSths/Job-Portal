const { Product } = require("./mongo")
const User = require("./mongo")
const path = require("path")
const fs = require("fs")

const fetchProduct_id = async (req, res, next) => {
    let products = await Product.findById(req.params.id)
    res.send({ data: products })
    // console.log({ data: products })
}

const fetchProduct = async (req, res, next) => {

    let per_page = parseInt(req.query.per_page) || 24
    let page = parseInt(req.query.page) || 1
    let search_term = req.query.search_term || ""

    let products = await Product.find({ name: RegExp(search_term, "i") }).skip((page - 1) * per_page).limit(per_page)


    res.send({ data: products })

}

const store = async (req, res, next) => {
    try {
        const { name, price, images, description, categories, brand } = req.body;

        const productItem = new Product({
            name: name,
            price: price,
            images: images,
            description: description,
            categories: categories,
            brand: brand,
        });

        // Check if the product already exists in the cart
        const existingProduct = await Product.findOne({ name: name });

        if (existingProduct) {
            res.status(200).json({ message: 'Item is already added' });
        } else {
            await productItem.save();
            res.status(201).json({ message: 'Item added in products successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the item to the products' });
    }
}
const update = async (req, res, next) => {
    // try {
    //     const productId = req.params.id;
    //     const updatedProductData = req.body;
    //     const { count } = req.body;

    //     // Find the product by ID and update it
    //     const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { count }, {
    //         new: true, // Return the updated product
    //     });

    //     if (!updatedProduct) {
    //         return res.status(404).json({ message: 'Product not found' });
    //     }

    //     return res.status(200).json(updatedProduct);
    // } catch (error) {
    //     console.error('Error updating product:', error);
    //     return res.status(500).json({ message: 'Internal server error' });
    // }

    try {
        const productId = req.params.id;
        const updatedProductData = req.body;
        const { count } = req.body;


        // Find the product by ID and update it
        const existingProduct = await Product.findByIdAndUpdate(productId, updatedProductData, {
            new: true, // Return the updated product
        });

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Initialize rating if it does not exist
        if (!existingProduct.rating) {
            existingProduct.rating = {};
        }

        // Set the count property
        existingProduct.rating.count = count;

        // Save the updated product
        const updatedProduct = await existingProduct.save();

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}

const delete_items = async (req, res) => {
    const itemId = req.params.itemId;

    try {
        // Find the item by ID and remove it from the database
        const deletedItem = await Product.findByIdAndRemove(itemId);
        console.log("Deleted", deletedItem)
        if (!deletedItem) {
            // If the item is not found in the database, return a 404 Not Found response.
            return res.status(404).json({ message: "Item not found in the cart." });
        }

        // Respond with a success message.
        res.json({ message: "Item removed from the cart." });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {
    fetchProduct,
    fetchProduct_id,
    store,
    update,
    delete_items
}