import React from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const addToCard = async (e, id) => {
  try {
    e?.stopPropagation();
    e?.preventDefault();

    const response = await fetch(SummaryApi.addToCart.url, {
      method: SummaryApi.addToCart.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message); // Show success message
      
      return responseData
    }

    else {
      toast.error(responseData.message); // Show error message
      
      return responseData

    }
  } catch (error) {
    toast.error("An error occurred while adding the product.");
    
  }
};

export default addToCard;
