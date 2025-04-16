// models/ContactMessage.js
import mongoose from "mongoose";

const { Schema } = mongoose; // Destructure Schema from mongoose for cleaner syntax

// Define the schema for contact form submissions
const contactMessageSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."], // Add custom error message
    trim: true, // Remove leading/trailing whitespace
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    trim: true,
    lowercase: true, // Store email in lowercase for consistency
    // Optional: Add basic email format validation if desired
    // match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  phone: {
    type: String, // Store phone as string for flexibility (e.g., include '+', '()', '-')
    trim: true,
    required: false, // Phone number is optional based on your form
  },
  message: {
    type: String,
    required: [true, "Message is required."],
    trim: true,
  },
  receivedAt: {
    type: Date,
    default: Date.now, // Automatically set the date/time when document is created
  },
  // NOTE: No 'user' reference field included for now, as per previous decision.
  // It can be added later when user authentication is implemented.
});

// Create the Mongoose model from the schema
// Mongoose will automatically look for the plural, lowercased version
// of your model name for the collection (i.e., 'contactmessages')
const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

// Export the model using ES Module syntax
export default ContactMessage;
