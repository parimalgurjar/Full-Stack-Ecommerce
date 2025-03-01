import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(13).fill(null); // Placeholder for loading state

  const fetchCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.categoryProduct.url);
      const dataResponse = await response.json();
      setCategoryProduct(dataResponse.data);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className='container mx-auto p-4 pl-8 pr-8'>
      <div className='flex justify-between gap-3 overflow-scroll scroll-bar'>
        {loading ? (
          // Render placeholder loading items
          categoryLoading.map((_, index) => (
            <div key={index} className='flex flex-col items-center cursor-pointer'>
              <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center animate-pulse'>
                {/* Placeholder for loading */}
              </div>
              <p className='text-center text-xs md:text-sm capitalize animate-pulse'>
                Loading...
              </p>
            </div>
          ))
        ) : (
          // Render actual category products once loaded
          categoryProduct.map((productArray, indexArray) => {
            const product = productArray[0];
            if (!product) return null;

            return (
              <Link
                to={`/product-category?category=${product?.category}`}
                key={indexArray}
                className='flex flex-col items-center cursor-pointer'
              >
                {product?.productImage?.length > 0 ? (
                  <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center'>
                    <img
                      src={product.productImage[0]}
                      alt={product?.category || 'Product Image'}
                      className='object-scale-down h-full w-full mix-blend-multiply hover:scale-110 transition-all'
                    />
                  </div>
                ) : (
                  <p>No image available</p>
                )}
                <p className='text-center text-xs md:text-sm capitalize'>
                  {product?.category}
                </p>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategoryList;
