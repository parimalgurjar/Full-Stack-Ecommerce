const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
    try {
        const categoryList = req?.body?.category || [];

        const products = await productModel.find({
            category: { $in: categoryList }
        });

        res.json({
            data: products,
            message: "Products fetched successfully",
            error: false,
            success: true
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false,
            error: true
        });
    }
};

module.exports = filterProductController;
