import React, { useEffect, useState } from "react";
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";

const BannerProduct = () => {
  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Function to go to the next image
  const nextImage = () => {
    if (currentImage === desktopImages.length - 1) {
      // Temporarily disable transition for smooth reset
      setIsTransitioning(false);
      setCurrentImage(0);
    } else {
      setIsTransitioning(true); // Re-enable transition for normal sliding
      setCurrentImage((prev) => prev + 1);
    }
  };

  // Function to go to the previous image
  const prevImage = () => {
    if (currentImage === 0) {
      setIsTransitioning(false);
      setCurrentImage(desktopImages.length - 1);
    } else {
      setIsTransitioning(true);
      setCurrentImage((prev) => prev - 1);
    }
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImage]);

  // Ensure the transition gets enabled after the reset
  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50); // Small timeout to allow immediate change without transition
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  return (
    <div className="container mx-auto px-4 rounded pl-8 pr-8">
      <div className="h-56 md:h-72 w-full relative">
        {/* Navigation Buttons for Desktop */}
        <div className="absolute w-full h-full md:flex items-center justify-between z-10 hidden">
          <div className="flex w-full justify-between text-2xl">
            <button className="bg-white p-2 rounded-full" onClick={prevImage}>
              <FaChevronLeft />
            </button>
            <button className="bg-white p-2 rounded-full" onClick={nextImage}>
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Desktop Version */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((imageURL, index) => (
            <div
              className="h-full w-full min-h-full min-w-full"
              key={index}
              style={{
                transform: `translateX(-${currentImage * 100}%)`,
                transition: isTransitioning
                  ? "all 0.5s ease-in-out"
                  : "none", // Disable transition temporarily during reset
              }}
            >
              <img src={imageURL} alt={`slide-${index}`} className="h-full w-full" />
            </div>
          ))}
        </div>

        {/* Mobile Version */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((imageURL, index) => (
            <div
              className="h-full w-full min-h-full min-w-full"
              key={index}
              style={{
                transform: `translateX(-${currentImage * 100}%)`,
                transition: isTransitioning
                  ? "all 0.5s ease-in-out"
                  : "none", // Disable transition temporarily during reset
              }}
            >
              <img src={imageURL} alt={`slide-${index}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
