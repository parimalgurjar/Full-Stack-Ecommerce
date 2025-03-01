const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req.body; // No need for optional chaining here
    const currentUser = req.userId;

    // Validate input
    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        success: false,
        error: true,
      });
    }

    if (!currentUser) {
      return res.status(401).json({
        message: "Unauthorized: Please log in",
        success: false,
        error: true,
      });
    }

    // Check if the product is already in the user's cart
    const isProductAvailable = await addToCartModel.findOne({
      productId,
      userId: currentUser,
    });

    if (isProductAvailable) {
      return res.status(409).json({
        message: "This product already exists in your cart",
        success: false,
        error: true,
      });
    }

    // Add new product to cart
    const payload = {
      productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new addToCartModel(payload);
    const savedProduct = await newAddToCart.save();

    return res.status(201).json({
      data: savedProduct,
      message: "Product added to cart successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Add to Cart Error:", err); // Log error for debugging
    return res.status(500).json({
      message: "Internal Server Error: " + (err.message || "Unknown error"),
      success: false,
      error: true,
    });
  }
};

module.exports = addToCartController;
