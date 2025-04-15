// src/components/ProductOverview.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Note: Static import for 'file-saver' is removed from here

const ProductOverview = ({
  heading = "Product Overview Heading",
  imageUrls = ["/images/ITRAKER_PRODUCT.png"],
  imageAlts = ["Product Image"],
  paragraphs = [],
  features = [],
  buttonText = "Request a Demo",
  buttonLink = "#",
  slideInterval = 3000,
  brochureUrl,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageCount = imageUrls.length;

  // Download handler using dynamic import
  const handleDownload = async () => {
    // Function is async
    if (!brochureUrl) {
      console.error("Brochure URL is not provided.");
      return;
    }
    // Try to determine filename from URL, fallback to generic name
    const fileName = brochureUrl.split("/").pop() || "product-brochure";

    try {
      // Dynamically import file-saver only when the function is called
      const { saveAs } = await import("file-saver");
      // Call saveAs after successful import
      saveAs(brochureUrl, fileName);
    } catch (error) {
      console.error("Error loading or using file-saver:", error);
      // Optionally, display an error message to the user here
    }
  };

  // Slider navigation functions
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imageCount - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === imageCount - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Automatic sliding effect
  useEffect(() => {
    if (imageCount <= 1) return; // Don't slide if only 0 or 1 image
    const intervalId = setInterval(goToNext, slideInterval);
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [currentIndex, slideInterval, imageCount]); // Dependencies

  // Get current image details safely
  const currentImageUrl = imageUrls[currentIndex] || "";
  const currentImageAlt =
    imageAlts[currentIndex] || imageAlts[0] || "Product image";

  // Component JSX
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 lg:mb-16">
          {heading}
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          {/* Image Column / Slider */}
          <div className="md:w-5/12 flex justify-center relative group">
            {/* Image container with border */}
            <div className="p-1 border-2 border-yellow-400 rounded-lg overflow-hidden">
              {currentImageUrl ? (
                <img
                  src={currentImageUrl}
                  alt={currentImageAlt}
                  className="rounded-lg w-full max-w-[32rem] h-[24rem] md:h-[28rem] object-cover"
                />
              ) : (
                <div className="w-full max-w-[32rem] h-[24rem] md:h-[28rem] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
            {/* Slider Arrows (only if multiple images) */}
            {imageCount > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition duration-300 opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Previous image"
                >
                  <FiChevronLeft size={24} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition duration-300 opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Next image"
                >
                  <FiChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Text Column */}
          <div className="md:w-6/12 text-gray-700">
            {/* Paragraphs */}
            {paragraphs.map((text, index) => (
              <p
                key={index}
                className="mb-5 text-base md:text-lg leading-relaxed"
              >
                {text}
              </p>
            ))}
            {/* Features */}
            {features.length > 0 && (
              <ul className="space-y-2 mb-8 list-disc list-inside text-base md:text-lg">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              {/* Main action button */}
              {buttonLink && buttonText && (
                <a href={buttonLink}>
                  <button className="bg-yellow-400 border border-transparent text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 hover:text-black transition">
                    {buttonText}
                  </button>
                </a>
              )}
              {/* Download button (only if brochureUrl is provided) */}
              {brochureUrl && (
                <button
                  className="bg-transparent border-2 border-yellow-400 text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-400 transition"
                  onClick={handleDownload}
                  type="button" // Specify type for non-submitting buttons
                >
                  Download Brochure
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// PropTypes definition
ProductOverview.propTypes = {
  heading: PropTypes.string,
  imageUrls: PropTypes.arrayOf(PropTypes.string),
  imageAlts: PropTypes.arrayOf(PropTypes.string),
  paragraphs: PropTypes.arrayOf(PropTypes.string),
  features: PropTypes.arrayOf(PropTypes.string),
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
  slideInterval: PropTypes.number,
  brochureUrl: PropTypes.string, // URL for the downloadable brochure
};

export default ProductOverview;
