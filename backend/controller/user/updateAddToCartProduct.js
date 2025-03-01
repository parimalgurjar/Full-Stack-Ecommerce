const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body.productId; // Make sure to send this in the request
        const qty = req.body.quantity;

        // Ensure product ID and quantity are provided
        if (!addToCartProductId || !qty) {
            return res.json({
                message: "Missing productId or quantity",
                error: true,
                success: false
            });
        }

        // Correct updateOne syntax
        const updateProduct = await addToCartModel.updateOne(
            { _id: addToCartProductId }, // Filter
            { $set: { quantity: qty } }  // Update
        );

        // Check if the update was successful
        if (updateProduct.modifiedCount === 0) {
            return res.json({
                message: "No product updated. Maybe wrong ID?",
                error: true,
                success: false
            });
        }

        res.json({
            message: "Product quantity updated successfully",
            data: updateProduct,
            error: false,
            success: true
        });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = updateAddToCartProduct;
