// src/components/ContactUs.jsx
import React, { useState } from "react"; // Make sure React is imported if not already global
import PropTypes from "prop-types"; // Optional: If you want prop type checking

const ContactUs = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // State for submission status (idle, sending, success, error)
  const [status, setStatus] = useState("idle");
  // State for specific error messages from backend or network
  const [errorMessage, setErrorMessage] = useState("");

  // Update state when input fields change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default page reload
    setStatus("sending"); // Update status to show loading state
    setErrorMessage(""); // Clear previous errors

    // Get the backend API base URL from environment variables
    // Ensure PUBLIC_BACKEND_API_BASE_URL is defined in client/.env
    const baseUrl = import.meta.env.VITE_PUBLIC_BACKEND_API_BASE_URL;

    // Check if the environment variable is set
    if (!baseUrl) {
      console.error(
        "Error: PUBLIC_BACKEND_API_BASE_URL environment variable is not set."
      );
      setStatus("error");
      setErrorMessage("Client configuration error. Please contact support.");
      return; // Stop submission if config is missing
    }

    // Construct the full API endpoint URL
    // Make sure '/send-email' matches the route path defined in your Express backend
    const endpoint = `${baseUrl}/send-email`;

    try {
      // Send the form data to the backend API endpoint
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indicate we're sending JSON
        },
        body: JSON.stringify(formData), // Convert JS object to JSON string
      });

      // Attempt to parse the JSON response from the backend
      const result = await response.json();

      // Check if the request was successful (status code 2xx) AND if the backend confirms success
      if (response.ok && result.success) {
        setStatus("success"); // Set status to success
        setFormData({ name: "", email: "", phone: "", message: "" }); // Clear the form fields
      } else {
        // Handle errors reported by the backend or non-ok HTTP statuses
        setStatus("error");
        setErrorMessage(result.error || `Server Error: ${response.statusText}`);
        console.error("Backend Error Response:", result);
      }
    } catch (error) {
      // Handle network errors (e.g., server down, CORS issue, network connectivity)
      console.error("Network/Fetch Error:", error);
      setStatus("error");
      setErrorMessage(
        "Could not connect to the server. Please check your network and try again."
      );
    }
  };

  // JSX for the component
  return (
    <section
      id="contact"
      className="bg-[#FBF6E9] text-[#003229] py-16 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Get in <span className="text-[#FBBF24]">Touch</span> With Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Basic details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">📞 Phone</h3>
              <p>
                <a
                  href="tel:9223453450"
                  className="text-[#003229] hover:text-[#FBBF24] transition font-medium"
                >
                  9223 453 450
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">📧 Email</h3>
              <p>
                <a
                  href="mailto:info@termitrack.com"
                  className="text-[#003229] hover:text-[#FBBF24] transition font-medium"
                >
                  info@termitrack.com
                </a>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-[#FBBF24] focus:border-[#FBBF24] focus:ring-2"
                  placeholder="Enter your name"
                />
              </div>
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-[#FBBF24] focus:border-[#FBBF24] focus:ring-2"
                  placeholder="Enter your email"
                />
              </div>
              {/* Phone Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-[#FBBF24] focus:border-[#FBBF24] focus:ring-2"
                  placeholder="Enter your phone number"
                />
              </div>
              {/* Message Input */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-[#FBBF24] focus:border-[#FBBF24] focus:ring-2"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <p className="text-sm text-green-600 font-medium">
                  Message sent successfully! We'll be in touch soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600 font-medium">
                  Error: {errorMessage || "Failed to send message."}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full bg-[#FBBF24] text-[#003229] py-2 px-4 rounded-md font-semibold shadow-md hover:bg-[#F59E0B] transition ${
                  status === "sending" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {status === "sending" ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Optional: Add PropTypes for better component documentation / type checking
ContactUs.propTypes = {
  // No props currently needed for this component, but you could add some if required later.
};

export default ContactUs;
