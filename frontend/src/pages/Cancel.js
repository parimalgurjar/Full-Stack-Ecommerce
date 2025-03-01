import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600">Payment Canceled</h1>
        <p className="text-gray-600 mt-4">
          Your payment was not completed. You can try again or return to the homepage.
        </p>
        <div className="mt-6">
          <Link
            to="/cart"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Try Again
          </Link>
          <Link
            to="/"
            className="ml-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
