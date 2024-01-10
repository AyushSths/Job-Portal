const { Cart } = require("./mongo")
// const Product = require("./product")

const fetchOrder = async (req, res, next) => {
    let orders = await Cart.find()
    res.send({ data: orders })
}

const order = async (req, res) => {
    try {
        const { name, price, categories, brand, images, productId, userId, username, status, quantity } = req.body;

        // Check if the product already exists in the cart
        const existingProduct = await Cart.findOne({ productId, userId });

        if (existingProduct) {
            // If the product already exists, update its quantity
            existingProduct.quantity += quantity;
            await existingProduct.save();
            res.status(200).json({ message: 'Item quantity updated in cart successfully' });
        } else {
            // If the product does not exist in the cart, create a new cart item
            const cartItem = new Cart({
                name: name,
                price: price,
                categories: categories,
                brand: brand,
                images: images,
                productId: productId,
                userId: userId,
                username: username,
                status: status,
                quantity: quantity,
            });

            await cartItem.save();
            res.status(201).json({ message: 'Item added to cart successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the item to the cart' });
    }
};

const updated_quantity = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const { quantity } = req.body;

        // Find the item by ID and update its quantity
        const updatedItem = await Cart.findByIdAndUpdate(
            itemId,
            { quantity },
            { new: true } // Return the updated item
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json({ message: "Quantity updated successfully", updatedItem });
    } catch (error) {
        console.error("Error updating quantity:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const delete_items = async (req, res) => {
    const itemId = req.params.itemId;

    try {
        // Find the item by ID and remove it from the database
        const deletedItem = await Cart.findByIdAndRemove(itemId);
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
    fetchOrder,
    order,
    updated_quantity,
    delete_items
}

