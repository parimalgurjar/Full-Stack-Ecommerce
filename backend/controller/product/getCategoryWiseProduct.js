const productModel = require("../../models/productModel");

const getCategoryWiseProduct = async (req, res) => {
  try {
    const { category } = req?.body||req?.query;  // Expecting category to be in the body

    // Ensure the category is provided
    if (!category) {
      return res.status(400).json({
        message: "Category is required",
        success: false,
        error: true,
      });
    }

    // Find products based on the category
    const product = await productModel.find({ category });

    if (product.length === 0) {
      return res.status(404).json({
        data: [],
        message: "No products found for this category",
        success: false,
        error: false,
      });
    }

    res.json({
      data: product,
      message: "Products fetched successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error fetching category products:", err);  // Log any errors
    res.status(500).json({
      message: err.message,
      success: false,
      error: true,
    });
  }
};

module.exports = getCategoryWiseProduct;
