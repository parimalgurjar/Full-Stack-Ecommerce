import React, { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import productCategory from '../helpers/productCategory';

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice
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

  const handleProductDeleteImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newProductImage
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.updateProduct.url, {
        method: SummaryApi.updateProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData?.message);
        onClose();
        fetchdata();
      }
      if (responseData.error) {
        toast.error(responseData?.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating the product.");
    }
  };

  return (
    <div className="bg-gray-500 justify-center flex fixed inset-0">
      <div className="w-full h-full fixed inset-0 flex justify-center items-center">
        {/* Background overlay */}
        <div className="absolute w-full h-full bg-black opacity-40"></div>

        {/* Content */}
        <div className="relative bg-white p-4 rounded z-10 w-full max-w-2xl max-h-[80%] overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">Admin Edit Product</h2>
            <div className="ml-auto w-fit cursor-pointer hover:text-red-600" onClick={onClose}>
              <IoCloseSharp className="text-xl" />
            </div>
          </div>

          {/* Form */}
          <form className="grid p-4 gap-4 max-h-[60vh] overflow-y-auto" onSubmit={handleSubmit}>
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
                <option value="">Select Category</option>
                {productCategory?.map((el, index) => (
                  <option value={el.value} key={index}>
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
                    <FaCloudUploadAlt className="text-4xl" />
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
                        <div className="absolute bottom-0 right-0 bg-red-600 text-white rounded-full cursor-pointer p-1 hidden group-hover:block" onClick={() => handleProductDeleteImage(index)}>
                          <MdDelete />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-600 text-sm">*Please upload an image</p>
                )}
              </div>
            </div>

            {/* Fullscreen Image */}
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
            <button type="submit" className="px-3 py-2 bg-red-600 text-white w-full hover:bg-red-700">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
