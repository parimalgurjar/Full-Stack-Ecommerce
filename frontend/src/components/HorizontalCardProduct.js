import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import '../App.css';
import displayINRCurrency from '../helpers/DisplayCurrency';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addToCard from '../helpers/addToCard';
import Context from '../context';
const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollElement = useRef();


  const {fetchUserAddToCart }=useContext(Context)

  const handleAddToCart=async(e,id)=>{
    await addToCard(e,id)
    fetchUserAddToCart()
  }






  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setData(categoryProduct?.data || []);
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
      console.error("Error fetching category products:", err);
    } finally {
      setLoading(false);
    }
  };

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-8 my-6 relative">
      <h1 className="text-2xl font-semibold py-2">{heading}</h1>
      
      {/* Scrollable Content Wrapper */}
      <div className="relative">
        {/* Scroll Buttons */}
        <button
          className="bg-white p-2 rounded-full left-2 top-1/2 transform -translate-y-1/2 absolute text-lg hidden md:block z-10"
          onClick={scrollLeft}
        >
          <FaChevronLeft />
        </button>
        <button
          className="bg-white p-2 rounded-full right-2 top-1/2 transform -translate-y-1/2 absolute text-lg hidden md:block z-10"
          onClick={scrollRight}
        >
          <FaChevronRight />
        </button>

        {/* Scrollable Product List */}
        <div
          className="flex md:gap-6 gap-4 items-center overflow-x-scroll scroll-bar overflow-scroll scroll-bar-none transition-all"
          ref={scrollElement}
        >
          {loading ? (
            data.map((product, index) => (
              <div
                key={product._id || index}
                className="w-full min-w-[280px] md:max-w-[320px] max-w-[280px] md:min-w-[320px] h-36 bg-white flex rounded-sm shadow mb-4"
              >
                <div className="bg-slate-200 h-full min-w-[120px] md:min-w-[145px] p-4 animate-pulse">
                  <img
                    src=''
                    alt={''}
                    className="h-full w-full object-cover hover:scale-110 transition-all bg-slate-500"
                  />
                </div>
                <div className="p-4 grid w-full animate-pulse">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 animate-pulse text-slate-500">
                    
                  </h2>
                  <p className="capitalize text-slate-500 bg-slate-500 p-1"></p>
                  <div className="flex gap-4 bg-slate-500 ">
                    <p className="">
                    
                    </p>
                    <p className="text-slate-500 line-through bg-slate-500 p-1">
                      
                    </p>
                  </div>
                  <div>
                    <button className=" py-1 px-3 text-sm rounded-full w-full  bg-slate-500 animate-pulse">
                      
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            data.map((product, index) => (
              <Link to={"product/"+product?._id}
                key={product._id || index}
                className="w-full min-w-[280px] md:max-w-[320px] max-w-[280px] md:min-w-[320px] h-36 bg-white flex rounded-sm shadow mb-4"
              >
                <div className="bg-slate-200 h-full min-w-[120px] md:min-w-[145px] p-4">
                  <img
                    src={product.productImage?.[0] || '/placeholder.png'}
                    alt={product.productName || 'Product Image'}
                    className="h-full w-full object-cover hover:scale-110 transition-all"
                  />
                </div>
                <div className="p-4 grid">
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
                    <button className="bg-red-600 py-1 px-3 text-sm rounded-full w-full text-white hover:bg-red-700" onClick={(e) => handleAddToCart(e,product?._id)} >
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

export default HorizontalCardProduct;

