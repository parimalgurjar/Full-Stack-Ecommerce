import SummaryApi from '../common';

const fetchCategoryWiseProduct = async (category) => {
  try {
    const response = await fetch(SummaryApi.categoryWiseProduct.url, {
      method: SummaryApi.categoryWiseProduct.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category }),  // Send category in the body
    });

    const dataResponse = await response.json();
    
    return dataResponse;
  } catch (error) {
    console.error("Error fetching category-wise product:", error);
    return null;  // Optionally return null or throw error
  }
};

export default fetchCategoryWiseProduct;
