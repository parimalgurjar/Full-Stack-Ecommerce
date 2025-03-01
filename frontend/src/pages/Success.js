import React from 'react';

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
      <p className="text-lg text-gray-700 mt-2">Thank you for your purchase! Your order has been confirmed.</p>
      <a href="/" className="mt-4 px-4 py-2 bg-green-500 text-white rounded font-medium hover:bg-green-600">
        Go to Home page
      </a>
    </div>
  );
};

export default Success;
