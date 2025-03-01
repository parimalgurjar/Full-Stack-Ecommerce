import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCart from '../components/AdminProductCart';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();
    

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className='flex justify-between items-center bg-white py-2 px-4'>
        <h1 className='font-bold text-lg'>All Products</h1>
        <button
          className='border rounded-full px-3 py-1 border-red-600 text-red-600 hover:text-white hover:bg-red-600 transition-all'
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* all product */}
      <div className='flex items-center flex-wrap py-4 gap-5 h-[calc(100vh-130px)] overflow-y-scroll justify-around'>
        {allProduct.map((product, index) => {
          return (
            <AdminProductCart
              data={product}
              key={index + 'allProduct'}
              fetchdata={fetchAllProduct}
            />
          );
        })}
      </div>

      {/* upload product */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
