// src/components/CustomerReviewCard.jsx
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FiUser } from "react-icons/fi";
import { FaStar } from "react-icons/fa"; // Import star icon

const CustomerReviewCard = ({
  customerName = "Customer Name",
  customerImage = "",
  reviewText = "This is a default review text...",
  rating = 5, // Add rating prop with default
  typingSpeed = 40,
}) => {
  // ... existing state and effects (isRevealed, displayedReview, etc.) ...
  const [isRevealed, setIsRevealed] = useState(false);
  const [displayedReview, setDisplayedReview] = useState("");
  const timeoutRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  useEffect(() => {
    setDisplayedReview("");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsRevealed(false);
  }, [reviewText]);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (isRevealed && displayedReview.length < reviewText.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedReview(reviewText.substring(0, displayedReview.length + 1));
      }, typingSpeed);
    } else if (!isRevealed) {
      setDisplayedReview("");
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isRevealed, displayedReview, reviewText, typingSpeed]);

  const revealReview = () => {
    if (!isRevealed) setIsRevealed(true);
  };

  // Helper to render stars
  const renderStars = () => {
    const stars = [];
    const roundedRating = Math.max(0, Math.min(5, Math.round(rating))); // Ensure rating is between 0-5
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          // Use a bright yellow/orange for filled stars, gray for potential empty ones (though logic just shows filled ones here)
          className={`w-4 h-4 ${
            i <= roundedRating ? "text-orange-500" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div
      className="w-full max-w-md mx-auto cursor-pointer group" // Width adjusted previously
      onClick={revealReview}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => (e.key === "Enter" || e.key === " ") && revealReview()}
      aria-label={`Review from ${customerName}. Rated ${rating} out of 5. Click to reveal.`} // Updated aria-label
      data-aos="fade-up"
      data-aos-duration="600"
    >
      <div className="relative pt-16">
        {/* Image/Placeholder container */}
        {isMounted && (
          <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-white bg-gray-300 flex items-center justify-center shadow-md z-10 overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
            {customerImage ? (
              <img
                src={customerImage}
                alt={`${customerName}'s profile`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <FiUser className="w-1/2 h-1/2 text-gray-500" />
            )}
          </div>
        )}

        {/* Review Card Body */}
        <div className="bg-yellow-400 text-black p-6 rounded-lg shadow-lg min-h-[180px] flex flex-col justify-start relative overflow-hidden">
          {" "}
          {/* Height adjusted previously */}
          {/* Customer Name */}
          <h4 className="font-semibold text-lg mt-4 flex-shrink-0">
            {customerName}
          </h4>
          {/* === ADDED Star Rating Display === */}
          <div className="flex items-center my-2 flex-shrink-0">
            {" "}
            {/* Container for stars */}
            {renderStars()}
          </div>
          {/* =============================== */}
          {/* Review Text Area */}
          <div className="flex-grow overflow-y-auto max-h-[80px] pr-2">
            {" "}
            {/* Height adjusted previously */}
            {!isRevealed ? (
              <p className="text-gray-800 italic opacity-90 text-sm">
                Rated {rating}/5 stars. Click card to read review...{" "}
                {/* Updated placeholder */}
              </p>
            ) : (
              <p className="font-bold text-black break-words">
                {displayedReview}
                {displayedReview.length < reviewText.length && (
                  <span className="inline-block w-[2px] h-4 bg-black ml-1 animate-pulse"></span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Updated PropTypes
CustomerReviewCard.propTypes = {
  customerName: PropTypes.string,
  customerImage: PropTypes.string,
  reviewText: PropTypes.string,
  rating: PropTypes.number, // Added rating prop type
  typingSpeed: PropTypes.number,
};

export default CustomerReviewCard;
