import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from "../context";
import { MdDelete } from "react-icons/md";
import displayINRCurrency from "../helpers/DisplayCurrency";
import {loadStripe} from '@stripe/stripe-js';
const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);

  // Placeholder loading cart items
  const loadingCart = Array(3).fill("loading"); // Adjust number based on UI needs

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      } else {
        console.error("Failed to fetch cart data:", responseData.message);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const increseQty = async (cartItemId, qty) => {
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: cartItemId, // Ensure correct ID is passed
          quantity: qty + 1
        })
      });
  
      const responseData = await response.json();
      
  
      if (responseData.success) {
        setData(prevData =>
          prevData.map(product =>
            product._id === cartItemId ? { ...product, quantity: qty + 1 } : product
          )
        );
        
      } else {
        console.error("Failed to update quantity:", responseData.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };








  const decreseQty = async (cartItemId, qty) => {
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: cartItemId, // Ensure correct ID is passed
          quantity: qty - 1
        })
      });
  
      const responseData = await response.json();
      console.log("Update Response:", responseData);


  
      if (responseData.success) {
        
        setData(prevData =>
          prevData.map(product =>
            product._id === cartItemId ? { ...product, quantity: qty - 1 } : product
          )
        );
      } else {
        console.error("Failed to update quantity:", responseData.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  

 
  const deleteCartProduct = async (cartItemId) => {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: cartItemId 
        })
      });
  
      const responseData = await response.json();
      
  
      if (responseData.success) {
        
        setData(prevData => prevData.filter(product => product._id !== cartItemId));
        
        context.fetchUserAddToCart()
      } else {
        console.error("Failed to delete product:", responseData.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handlePayment=async()=>{
    console.log("process.env.REACT_APP_STRIPE_KEY_PUBLIC_KEY",process.env.REACT_APP_STRIPE_KEY_PUBLIC_KEY)
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_KEY_PUBLIC_KEY);

    const response=await fetch(SummaryApi.payment.url,{
      method:SummaryApi.payment.method,
      credentials:'include',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({
        cartItems:data
      })
    })
    const responseData=await response.json()
    if(responseData?.id){
      stripePromise.redirectToCheckout({sessionId:responseData.id})
    }

  }
  
  const totalQty=data.reduce((previousValue,currentValue)=>previousValue+currentValue.quantity,0)
  const totalPrice = data.reduce((previousValue, currentValue) => 
    previousValue + (currentValue.quantity * (currentValue?.productId?.sellingPrice)), 0);
  return (
    <div className="container mx-auto my-5 px-4 lg:px-6">
  <div className="flex flex-col lg:flex-row justify-between gap-4">
    {/* Product List */}
    <div className="lg:mt-0 w-full max-w-md md:max-w-lg lg:max-w-2xl">
      {loading
        ? loadingCart.map((el, index) => (
            <div key={index} className="w-full bg-slate-200 h-32 my-2"></div>
          ))
        : data.map((product, index) => (
            <div
              key={product?._id || index}
              className="w-full bg-white h-32 flex items-center shadow-md rounded-lg mb-5 md:w-[500px] lg:w-[550px]"
            >
              {/* Product Image */}
              <div className="h-full w-36 bg-gray-300 flex-shrink-0">
                <img
                  src={product?.productId?.productImage[0]}
                  alt="Product"
                  className="h-full w-full object-scale-down mix-blend-multiply"
                />
              </div>

              {/* Product Details */}
              <div className="px-4 flex-1 relative">
                {/* Delete Product */}
                <div
                  className="absolute right-2 top-2 text-red-600 rounded-full p-2 hover:text-white hover:bg-red-600 text-xl cursor-pointer"
                  onClick={() => deleteCartProduct(product?._id)}
                >
                  <MdDelete />
                </div>

                <h3 className="text-lg font-semibold md:text-xl text-ellipsis line-clamp-1">
                  {product?.productId?.productName || "Product Name"}
                </h3>
                <p className="capitalize text-slate-500">{product?.productId?.category}</p>
                <div className='flex justify-between items-center'>
                <p className="text-red-600 font-medium text-lg">
                  Price: {displayINRCurrency(product?.productId?.sellingPrice || "N/A")}
                </p>
                <p className="text-slate-600 font-semibold text-lg">
                  Price: {displayINRCurrency(product?.productId?.sellingPrice*product?.quantity)}
                </p>
                </div>
               

                {/* Quantity Control */}
                <div className="flex items-center mt-2">
                  <button
                    className="bg-gray-200 text-lg hover:text-white text-black h-6 w-6 flex items-center rounded p-2 mr-2 hover:bg-red-600 justify-center border-red-600 border"
                    onClick={() => decreseQty(product?._id, product?.quantity)}
                  >
                    -
                  </button>
                  <span>{product?.quantity}</span>
                  <button
                    className="bg-gray-200 text-lg hover:text-white h-6 w-6 text-black rounded p-2 ml-2 hover:bg-red-600 flex items-center justify-center border-red-600 border"
                    onClick={() => increseQty(product?._id, product?.quantity)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
    </div>

    {/* Summary Section */}
    {
      data[0]&&(

    <div className="mt-5 lg:mt-0 w-full max-w-md md:max-w-lg lg:max-w-sm">
  {loading ? (
    <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
  ) : (
    <div className="h-36 bg-slate-200 shadow-md border border-gray-300 rounded-t-lg flex flex-col">
      <h2 className="text-white bg-red-600 px-4 py-2 rounded-t-lg">Summary</h2>
     <div className='py-2'>
     <div className="flex justify-between items-center px-4 gap-2 font-medium text-lg text-slate-600 flex-1">
        <p>Quantity</p>
        <p>{totalQty}</p>
      </div>
      <div className="flex justify-between items-center px-4 gap-2 font-medium text-lg text-slate-600 flex-1">
        <p>Total Price</p>
        <p>{displayINRCurrency(totalPrice)}</p>
      </div>
     </div>
      <button className="bg-blue-500 text-white p-2 w-full mt-auto" onClick={handlePayment}>Payment</button>
    </div>
  )}
</div>
      )
    }

  </div>
</div>

  );
};

export default Cart;
