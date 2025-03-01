import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from "../context";
import { MdDelete } from "react-icons/md";
import displayINRCurrency from "../helpers/DisplayCurrency";
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
      });
      const responseData = await response.json();
      if (responseData.success) setData(responseData.data);
      else console.error("Failed to fetch cart data:", responseData.message);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const updateQuantity = async (cartItemId, newQty) => {
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: cartItemId, quantity: newQty })
      });
      const responseData = await response.json();
      if (responseData.success) {
        setData(prevData => prevData.map(product =>
          product._id === cartItemId ? { ...product, quantity: newQty } : product
        ));
      } else console.error("Failed to update quantity:", responseData.message);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const deleteCartProduct = async (cartItemId) => {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: cartItemId })
      });
      const responseData = await response.json();
      if (responseData.success) {
        setData(prevData => prevData.filter(product => product._id !== cartItemId));
        context.fetchUserAddToCart();
      } else console.error("Failed to delete product:", responseData.message);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handlePayment = async () => {
    try {
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY_PUBLIC_KEY);
      const response = await fetch(SummaryApi.payment.url, {
        method: SummaryApi.payment.method,
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ cartItems: data })
      });
      const responseData = await response.json();
      if (responseData?.id) stripe.redirectToCheckout({ sessionId: responseData.id });
    } catch (error) {
      console.error("Error handling payment:", error);
    }
  };

  const totalQty = data.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = data.reduce((acc, item) => acc + item.quantity * item?.productId?.sellingPrice, 0);

  return (
    <div className="container mx-auto my-5 px-4 lg:px-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="w-full max-w-2xl">
          {loading ? [...Array(3)].map((_, i) => <div key={i} className="w-full bg-slate-200 h-32 my-2"></div>)
            : data.map(product => (
              <div key={product?._id} className="bg-white h-32 flex items-center shadow-md rounded-lg mb-5">
                <div className="h-full w-36 bg-gray-300 flex-shrink-0">
                  <img src={product?.productId?.productImage[0]} alt="Product" className="h-full w-full object-scale-down" />
                </div>
                <div className="px-4 flex-1 relative">
                  <MdDelete className="absolute right-2 top-2 text-red-600 cursor-pointer text-2xl" onClick={() => deleteCartProduct(product?._id)} />
                  <h3 className="text-lg font-semibold text-ellipsis line-clamp-1">{product?.productId?.productName}</h3>
                  <p className="text-slate-500">{product?.productId?.category}</p>
                  <div className="flex justify-between">
                    <p className="text-red-600 font-medium text-lg">{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                    <p className="text-slate-600 font-semibold text-lg">{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <button className="bg-gray-200 h-6 w-6 border rounded" onClick={() => updateQuantity(product?._id, product.quantity - 1)}>-</button>
                    <span className="mx-2">{product?.quantity}</span>
                    <button className="bg-gray-200 h-6 w-6 border rounded" onClick={() => updateQuantity(product?._id, product.quantity + 1)}>+</button>
                  </div>
                </div>
              </div>
          ))}
        </div>
        {data.length > 0 && (
          <div className="w-full max-w-sm">
            <div className="bg-slate-200 shadow-md border rounded-lg">
              <h2 className="text-white bg-red-600 px-4 py-2 rounded-t-lg">Summary</h2>
              <div className="py-2 px-4">
                <p className="flex justify-between font-medium text-lg text-slate-600"><span>Quantity</span><span>{totalQty}</span></p>
                <p className="flex justify-between font-medium text-lg text-slate-600"><span>Total Price</span><span>{displayINRCurrency(totalPrice)}</span></p>
              </div>
              <button className="bg-blue-500 text-white p-2 w-full" onClick={handlePayment}>Payment</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
