// src/components/ProductHero.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ProductHero = ({
  productName = "Product Name",
  subTitle = "Product Subtitle",
  description = "Product description goes here.",
  // --- MODIFIED PROP ---
  backgroundImageUrls = ["/images/IndiaMap_Termitrack.png"], // Expects an array now
  // --- END MODIFIED PROP ---
  buttonText = "ORDER NOW",
  buttonLink = "#",
  slideInterval = 3000, // Default to 1.5 seconds as requested (can be adjusted)
}) => {
  // State to track the current background image index
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageCount = backgroundImageUrls.length;

  // --- useEffect for Automatic Sliding ---
  useEffect(() => {
    // Don't slide if there's only one image or none
    if (imageCount <= 1) return;

    const intervalId = setInterval(() => {
      // Move to the next index, wrap around if at the end
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageCount);
    }, slideInterval);

    // Clear interval on component unmount or when dependencies change
    return () => clearInterval(intervalId);
  }, [imageCount, slideInterval]); // Rerun if image count or interval changes

  return (
    <section
      className="relative text-white pt-0 py-32 md:py-32 overflow-hidden mt-10" // Added overflow-hidden, removed background classes
    >
      {/* --- Background Image Layers --- */}
      {backgroundImageUrls.map((url, index) => (
        <div
          key={url} // Use URL or a more unique key if URLs aren't unique
          className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out z-0 ${
            // Transition opacity
            index === currentIndex ? "opacity-300" : "opacity-0" // Show only current image
          }`}
          style={{ backgroundImage: `url(${url})` }}
        />
      ))}
      {/* --- End Background Image Layers --- */}

      {/* Dark overlay for text readability (ensure it's above images) */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Content (ensure it's above overlay) */}
      <div className="relative container mx-auto px-12 text-left z-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {productName}
        </h1>
        <p className="text-xl md:text-2xl font-semibold mb-4">{subTitle}</p>
        <p className="text-lg md:text-xl mb-8 max-w-3xl">{description}</p>
        {buttonLink &&
          buttonText && ( // Render button only if props provided
            <a href={buttonLink}>
              <button className="bg-yellow-400 border border-transparent text-black py-3 px-6 rounded-lg font-semibold hover:bg-transparent hover:border-yellow-400 hover:text-yellow-400 transition">
                {buttonText}
              </button>
            </a>
          )}
      </div>
    </section>
  );
};

// Define PropTypes
ProductHero.propTypes = {
  productName: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  backgroundImageUrls: PropTypes.arrayOf(PropTypes.string), // Expects an array
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
  slideInterval: PropTypes.number,
};

export default ProductHero;
