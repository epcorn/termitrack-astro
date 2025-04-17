// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";
import PropTypes from "prop-types";

const Navbar = ({ isHome = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const toggleProductsMenu = () => setProductsMenuOpen(!productsMenuOpen);

  // Closes dropdown if mobile menu is closed
  useEffect(() => {
    if (!menuOpen) {
      setProductsMenuOpen(false);
    }
  }, [menuOpen]);

  const navClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled
      ? "bg-[#003229] shadow-md top-0"
      : isHome
      ? "bg-transparent top-10"
      : "bg-[#003229] top-0"
  }`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0">
            <img src="/images/logoPart.png" alt="Logo" className="h-12" />
            <span className="font-varela text-5xl font-bold text-zinc-200 ml-2">
              Termitrack
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home Link */}
            <a
              href="/"
              className="text-white hover:text-[#FBBF24] transition px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProductsMenu}
                className="text-white hover:text-[#FBBF24] transition px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                Products <FiChevronDown className="ml-1" />
              </button>
              {productsMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-[#003229] text-white rounded-md shadow-lg py-1">
                  {" "}
                  {/* Added py-1 */}
                  <a
                    href="/product/tracker-only"
                    className="block px-4 py-2 text-sm hover:bg-[#FBBF24] hover:text-black"
                  >
                    Tracker Only
                  </a>
                  <a
                    href="/product/itracker-base"
                    className="block px-4 py-2 text-sm hover:bg-[#FBBF24] hover:text-black"
                  >
                    iTracker-Base
                  </a>
                  <a
                    href="/product/itracker-pro"
                    className="block px-4 py-2 text-sm hover:bg-[#FBBF24] hover:text-black"
                  >
                    iTracker-Pro
                  </a>
                </div>
              )}
            </div>

            {/* === ADDED CUSTOMERS LINK (Desktop) === */}
            <a
              href="/customers"
              className="text-white hover:text-[#FBBF24] transition px-3 py-2 rounded-md text-sm font-medium"
            >
              Customers
            </a>
            {/* ======================================= */}

            {/* Contact Link */}
            <a
              href="/#contact" // Link to contact section on homepage
              className="text-white hover:text-[#FBBF24] transition px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-white hover:text-[#FBBF24] focus:outline-none p-2"
              aria-label="Open menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[59]"
          onClick={() => setMenuOpen(false)} // Close menu on backdrop click
        />
      )}

      {/* Mobile Slide-out Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#003229] text-white transform transition-transform duration-300 ease-in-out shadow-lg z-[60] ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="font-bold text-lg">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white hover:text-[#FBBF24] focus:outline-none p-1"
            aria-label="Close menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Items */}
        {/* Added overflow-y-auto and adjusted height calculation */}
        <nav className="flex flex-col space-y-1 p-4 overflow-y-auto h-[calc(100vh-3.5rem)]">
          {" "}
          {/* Adjusted header height assumption */}
          {/* Home */}
          <a
            href="/"
            className="block py-2.5 px-3 rounded hover:bg-gray-700 hover:text-[#FBBF24] transition"
            onClick={() => setMenuOpen(false)} // Close menu on click
          >
            Home
          </a>
          {/* Products (Mobile) */}
          <div>
            <button
              onClick={toggleProductsMenu}
              className="w-full flex justify-between items-center py-2.5 px-3 rounded hover:bg-gray-700 hover:text-[#FBBF24] transition text-left font-medium"
            >
              <span>Products</span>
              <FiChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${
                  productsMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {productsMenuOpen && (
              <div className="ml-4 mt-1 pl-2 py-1 border-l-2 border-gray-600 space-y-1 bg-gray-800/30 rounded-r-md">
                <a
                  href="/product/tracker-only"
                  className="block py-1.5 px-3 rounded hover:bg-gray-700 hover:text-[#FBBF24] transition text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Tracker Only
                </a>
                <a
                  href="/product/itracker-base"
                  className="block py-1.5 px-3 rounded hover:bg-gray-700 hover:text-[#FBBF24] transition text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  iTracker-Base
                </a>
                <a
                  href="/product/itracker-pro"
                  className="block py-1.5 px-3 rounded hover:bg-gray-700 hover:text-[#FBBF24] transition text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  iTracker-Pro
                </a>
              </div>
            )}
          </div>
          {/* === ADDED CUSTOMERS LINK (Mobile) === */}
          <a
            href="/customers"
            className="block py-2.5 px-3 rounded hover:bg-gray-700 hover:text-[#FBBF24] transition"
            onClick={() => setMenuOpen(false)} // Close menu on click
          >
            Customers
          </a>
          {/* ==================================== */}
          {/* Contact */}
          <a
            href="/#contact" // Link to contact section on homepage
            className="block py-2.5 px-3 rounded hover:bg-gray-700 hover:text-[#FBBF24] transition"
            onClick={() => setMenuOpen(false)} // Close menu on click
          >
            Contact Us
          </a>
        </nav>
      </div>
    </nav>
  );
};

// Define PropTypes
Navbar.propTypes = {
  isHome: PropTypes.bool,
};

export default Navbar;
