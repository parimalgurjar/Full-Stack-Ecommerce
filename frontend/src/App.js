import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const [cartProductCount,setCartProductCount]=useState(0)

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data)); // Dispatch to user slice
      } else {
        console.log("Failed to fetch user details:", dataApi.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Fetch add-to-cart count
  const fetchUserAddToCart = async () => {

      const dataResponse = await fetch(SummaryApi.countAddToCartProduct.url, {
        method: SummaryApi.countAddToCartProduct.method,
        credentials: "include",
      });

      const dataApi = await dataResponse.json();
      
      setCartProductCount(dataApi?.data?.count)

    
    
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart
        }}
      >
        <ToastContainer position="top-center"/>
        <Header />
        <main className="min-h-[calc(100vh-90px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
};

export default App;
