import React, { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UploadProduct = ({ onClose, fetchData}) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url]
    }));
  };

  const handleProductDeleteImage=async(index)=>{
    const newProductImage=[...data.productImage]
    newProductImage.splice(index,1)
    setData((prev) => ({
      ...prev,
      productImage: [...newProductImage]
    }));
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const response=await fetch(SummaryApi.uploadProduct.url,{
      method:SummaryApi.uploadProduct.method,
      credentials:"include",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
    })
    const responseData=await response.json()
    if(responseData.success){
      toast.success(responseData?.message)
      onClose()
      fetchData()
    }
    if(responseData.error){
      toast.error(responseData?.message)
    }
  }

  return (
    <div className="w-full h-full fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      {/* Background overlay */}
      <div className="absolute w-full h-full bg-slate-200 opacity-35"></div>

      {/* Content */}
      <div className="relative bg-white p-4 rounded z-10 w-full max-w-2xl h-full max-h-[80%] overflow-hidden pb-3">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div className="ml-auto w-fit cursor-pointer hover:text-red-600" onClick={onClose}>
            <IoCloseSharp className="text-xl" />
          </div>
        </div>

        {/* Form */}
        <form className="grid p-4 gap-4 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="block">Product Name:</label>
            <input
              id="productName"
              name="productName"
              type="text"
              placeholder="Enter product name"
              value={data.productName}
              onChange={handleOnChange}
              className="p-2 border rounded bg-slate-100 w-full"
            />
          </div>

          {/* Brand Name */}
          <div>
            <label htmlFor="brandName" className="block">Brand Name:</label>
            <input
              id="brandName"
              name="brandName"
              type="text"
              placeholder="Enter brand name"
              value={data.brandName}
              onChange={handleOnChange}
              className="p-2 border rounded bg-slate-100 w-full"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block">Category:</label>
            <select
              id="category"
              name="category"
              value={data.category}
              onChange={handleOnChange}
              className="p-2 border rounded bg-slate-100 w-full"
            >
              <option value={""}>Select Category</option>
              {productCategory.map((el, index) => (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>

          {/* Product Image */}
          <div>
            <label htmlFor="productImage" className="block">Product Image:</label>
            <label htmlFor="uploadImageInput">
              <div className="p-2 bg-slate-100 border h-32 w-full flex justify-center items-center cursor-pointer">
                <div className="flex-col justify-center items-center flex gap-2">
                  <span className="text-4xl"><FaCloudUploadAlt /></span>
                  <p className="text-sm">Upload Product</p>
                  <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadProduct} />
                </div>
              </div>
            </label>
            <div>
              {data.productImage.length > 0 ? (
                <div className="flex items-center gap-2">
                  {data.productImage.map((el, index) => (
                    <div className="relative group" key={index}>
                      <img
                        src={el}
                        alt={`Product ${index}`}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <div className='absolute bottom-0 right-0 bg-red-600 text-white rounded-full cursor-pointer p-1 hidden group-hover:block transition-all' onClick={()=>handleProductDeleteImage(index)}>
                        <MdDelete />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-600 text-s">*Please upload an image</p>
              )}
            </div>
            
          </div>

          {/* Fullscreen image display */}
          {openFullScreenImage && (
            <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
          )}

          {/* Description */}
          <div>
            <label htmlFor="description" className="block">Description:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              value={data.description}
              onChange={handleOnChange}
              className="p-2 border rounded bg-slate-100 w-full"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block">Price:</label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="Enter product price"
              value={data.price}
              onChange={handleOnChange}
              className="p-2 border rounded bg-slate-100 w-full"
            />
          </div>

          {/* Selling Price */}
          <div>
            <label htmlFor="sellingPrice" className="block">Selling Price:</label>
            <input
              id="sellingPrice"
              name="sellingPrice"
              type="number"
              placeholder="Enter selling price"
              value={data.sellingPrice}
              onChange={handleOnChange}
              className="p-2 border rounded bg-slate-100 w-full"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="px-3 py-2 bg-red-600 text-white mb-10 mt-2 w-full hover:bg-red-700">
          Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
