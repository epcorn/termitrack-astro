import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";

dotenv.config();

const app = express();

if (
  !process.env.EMAIL_USER ||
  !process.env.EMAIL_PASS ||
  !process.env.RECIPIENT_EMAIL
) {
  console.error(
    "FATAL ERROR: Missing required environment variables (EMAIL_USER, EMAIL_PASS, RECIPIENT_EMAIL)."
  );
  process.exit(1);
}

//dev logging
if (process.env.NODE_ENV !== "production") {
  app.use(
    morgan(function (tokens, req, res) {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");
    })
  );
}
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error("Nodemailer transporter verification failed:", error);
  } else {
    console.log("Nodemailer transporter is ready to send emails.");
  }
});

app.post("/api/send-email", async (req, res) => {
  const { name, email, message, phone } = req.body;

  if (!name || !email || !message || !phone) {
    console.warn("Contact form validation failed:", req.body);
    return res.status(400).json({
      success: false,
      error: "Missing required fields: name, email, phone, message",
    });
  }

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Contact Form Submission from ${name}`,
    text:
      `You received a message via the Contact Form:\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n\n` +
      `Message:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Contact email sent successfully from ${email}`);
    res.json({ success: true });
  } catch (error) {
    console.error("Nodemailer Error (Contact Form /send-email):", error);
    res.status(500).json({
      success: false,
      error: "Failed to send message. Please try again later.",
    });
  }
});

app.post("/api/send-quote-request", async (req, res) => {
  const { name, company, email, phone, city, message } = req.body;

  if (!name || !email || !phone || !message) {
    console.warn("Quote request validation failed:", req.body);
    return res.status(400).json({
      success: false,
      error:
        "Missing required fields: name, email, phone, and message are required.",
    });
  }

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: process.env.RECIPIENT_EMAIL,
    subject:
      `New Quote Request from ${name}` + (company ? ` (${company})` : ""),
    text:
      `You received a new quote request:\n\n` +
      `--- Requester Details ---\n` + // Added heading for clarity
      `Name: ${name}\n` +
      `Company: ${company || "N/A"}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `City: ${city || "N/A"}\n\n` +
      `--- Message/Requirements ---\n` + // Added heading for clarity
      `${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Quote request email sent successfully from ${email}`);
    res.json({ success: true });
  } catch (error) {
    console.error(
      "Nodemailer Error (Quote Request /send-quote-request):",
      error
    );
    res.status(500).json({
      success: false,
      error: "Failed to send quote request. Please try again later.",
    });
  }
});

(function fn() {
  if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "/client/dist")));
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
    );
  } else {
    app.get("/", (req, res) => {
      res.send("API is running....");
    });
  }
})();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at port: ${port}`));
