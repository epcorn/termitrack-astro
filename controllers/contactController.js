// controllers/contactController.js (NEW FILE)
import ContactMessage from "../models/contactMessage.js"; // Adjust path if needed
import {
  sendContactEmail,
  sendQuoteRequestEmail,
} from "../services/emailService.js"; // Assuming email logic is moved to a service

// Handles POST /api/send-email
export const handleContactFormSubmission = async (req, res) => {
  const { name, email, message, phone } = req.body;

  // Keep phone optional based on previous discussions
  if (!name || !email || !message) {
    console.warn("Contact form validation failed:", req.body);
    return res.status(400).json({
      success: false,
      error: "Missing required fields: name, email, message",
    });
  }

  try {
    // 1. Save to Database (if you decided to store them)
    const newMessage = new ContactMessage({
      name,
      email,
      phone: phone || null,
      message,
    });
    await newMessage.save();
    console.log("Contact message saved to DB.");

    // 2. Send Email
    await sendContactEmail({ name, email, phone, message });
    console.log(`Contact email sent successfully from ${email}`);

    // 3. Send Success Response
    res
      .status(200)
      .json({ success: true, message: "Message received successfully!" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to process your request." });
  }
};

// Handles POST /api/send-quote-request
export const handleQuoteRequestSubmission = async (req, res) => {
  const { name, company, email, phone, city, message } = req.body;

  if (!name || !email || !phone || !message) {
    console.warn("Quote request validation failed:", req.body);
    return res.status(400).json({
      success: false,
      error:
        "Missing required fields: name, email, phone, and message are required.",
    });
  }

  try {
    // Optional: Save quote request to DB if needed (create a Quote model)
    // const newQuote = new QuoteRequest({...req.body});
    // await newQuote.save();

    // Send Email
    await sendQuoteRequestEmail({ name, company, email, phone, city, message });
    console.log(`Quote request email sent successfully from ${email}`);

    res.json({ success: true });
  } catch (error) {
    console.error("Error processing quote request:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send quote request. Please try again later.",
    });
  }
};
