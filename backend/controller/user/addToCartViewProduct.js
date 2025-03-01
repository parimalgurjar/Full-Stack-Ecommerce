const addToCartModel = require('../../models/cartProduct');

const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = req.userId;
    const allProduuct = await addToCartModel.find({
      userId: currentUser,
    }).populate("productId");
    res.json({
      data: allProduuct,
      success: true,
      error: false, 
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

module.exports = addToCartViewProduct;
