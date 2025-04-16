// services/emailService.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Check for required env variables
if (
  !process.env.EMAIL_USER ||
  !process.env.EMAIL_PASS ||
  !process.env.RECIPIENT_EMAIL
) {
  console.error(
    "EMAIL SERVICE FATAL ERROR: Missing required email environment variables."
  );
  throw new Error("Missing EMAIL_USER, EMAIL_PASS, or RECIPIENT_EMAIL in .env");
}

let transporter;

try {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certs (safe for dev, NOT prod)
    },
  });

  // Verify connection configuration
  transporter.verify((error, success) => {
    if (error) {
      console.error("Email transporter verification failed:", error);
    } else {
      console.log("Email transporter ready to send messages.");
    }
  });
} catch (err) {
  console.error("Failed to create email transporter:", err);
  throw err;
}

// CONTACT FORM EMAIL
export const sendContactEmail = async ({ name, email, phone, message }) => {
  if (!transporter) throw new Error("Email transporter not configured.");

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${
      phone || "N/A"
    }\n\nMessage:\n${message}`,
  };

  return transporter.sendMail(mailOptions);
};

// QUOTE REQUEST EMAIL
export const sendQuoteRequestEmail = async ({
  name,
  company,
  email,
  phone,
  city,
  message,
}) => {
  if (!transporter) throw new Error("Email transporter not configured.");

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Quote Request from ${name}${company ? " at " + company : ""}`,
    text: `Name: ${name}\nCompany: ${
      company || "N/A"
    }\nEmail: ${email}\nPhone: ${phone}\nCity: ${
      city || "N/A"
    }\n\nMessage:\n${message}`,
  };

  return transporter.sendMail(mailOptions);
};
