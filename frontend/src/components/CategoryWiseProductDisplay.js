import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import '../App.css'
import displayINRCurrency from'../helpers/DisplayCurrency'

import { Link } from 'react-router-dom';
import addToCard from '../helpers/addToCard';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';
const CategoryWiseProductDisplay= ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const {fetchUserAddToCart }=useContext(Context)

  const handleAddToCart=async(e,id)=>{
    await addToCard(e,id)
    fetchUserAddToCart()
  }

  

  const fetchData = async () => {
    setLoading(true);
    
    try {
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setData(categoryProduct?.data || []);
      
    } catch (err) {

      console.error("Error fetching category products:", err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-8 my-6 relative">
      <h1 className="text-2xl font-semibold py-2">{heading}</h1>
  
      {/* Scrollable Content Wrapper */}
      <div className="relative">
        {/* Scrollable Product List */}
        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-hidden transition-all"
        >
          {loading ? (
            data.map((product, index) => (
              <div
                key={product._id || index}
                className="w-full min-w-[280px] md:max-w-[320px] max-w-[280px] md:min-w-[320px] bg-white rounded-sm shadow mb-4"
              >
                <div className="bg-slate-200 h-48 min-w-[280px] md:min-w-[145px] p-4 flex justify-center items-center">
                  <img
                    src={''}
                    alt={''}
                    className="h-full object-cover hover:scale-110 transition-all mix-blend-multiply animate-pulse bg-slate-500"
                  />
                </div>
                <div className="p-4 grid gap-3">
  
                  <p className="capitalize text-slate-500 bg-slate-500 animate-pulse"></p>
                  <div className="flex gap-4">
                    <p className="font-medium"></p>
                    <p className="text-slate-500 line-through bg-slate-500 animate-pulse"></p>
                  </div>
                  <div>
                    <button className="py-1 px-3 text-sm rounded-full w-full text-white bg-slate-500 animate-pulse"></button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            data.map((product, index) => (
              <Link
                to={"/product/" + product?._id}
                key={product._id || index}
                className="w-full min-w-[280px] md:max-w-[320px] max-w-[280px] md:min-w-[320px] bg-white rounded-sm shadow mb-4" onClick={scrollTop}
              >
                <div className="bg-slate-200 h-48 min-w-[280px] md:min-w-[145px] p-4 flex justify-center items-center">
                  <img
                    src={product.productImage?.[0] || '/placeholder.png'}
                    alt={product.productName || 'Product Image'}
                    className="h-full object-cover hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">{product?.category}</p>
                  <div className="flex gap-4">
                    <p className="text-red-600 font-medium">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <div>
                    <button
                      className="bg-red-600 py-1 px-3 text-sm rounded-full w-full text-white hover:bg-red-700"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
  
};

export default CategoryWiseProductDisplay;
