import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/DisplayCurrency";

const AdminProductCart = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white rounded p-4">
      <div className="w-40">
      <div className="flex items-center w-32 h-32">
      <img
          src={data?.productImage[0]}
          
          alt="product-image"
          className="object-fill mx-auto h-full"
        />
      </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
        <div>
          <p className="font-semibold">
            
          {
             displayINRCurrency(data.sellingPrice)
          }
            
          </p>
          <div
            className="w-fit ml-auto bg-green-200 text-black rounded-full p-2 hover:bg-green-600 hover:text-white cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCart;
