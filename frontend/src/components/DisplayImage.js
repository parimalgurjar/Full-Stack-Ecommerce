import React from 'react';
import { IoCloseSharp } from "react-icons/io5"; // Optional: if you want to use a close icon

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50'>
      <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4 relative'>
        {/* Close Button */}
        <div className="ml-auto w-fit cursor-pointer hover:text-red-600 absolute top-4 right-4" onClick={onClose}>
          <IoCloseSharp className="text-xl" />
        </div>

        {/* Image */}
        <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
          <img src={imgUrl} alt='Full screen view' className='h-auto max-h-full max-w-full' />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
