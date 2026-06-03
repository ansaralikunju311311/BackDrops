const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend dev server
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Disk Storage Configuration (for file uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Save files with original name prefixed with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Initialize Nodemailer Transporter
let transporter;

async function initMailer() {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpUser && smtpPass) {
    console.log(`Setting up standard SMTP transport using: ${smtpUser}`);
    transporter = nodemailer.createTransport({
      service: 'gmail', // Convenient default, change to custom host if needed
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });
  } else {
    console.log("No SMTP credentials found in .env. Creating temporary Ethereal test account...");
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log(`Ethereal Test account created! Username: ${testAccount.user}`);
      console.log("Emails sent in development can be inspected via the printed Ethereal URLs.");
    } catch (err) {
      console.error("Failed to set up Ethereal mailer fallback:", err);
    }
  }
}

initMailer();

// 1. Endpoint: Form Submission Email Forwarding
app.post('/api/contact', async (req, res) => {
  const { fullName, companyName, email, phoneNumber, message } = req.body;

  const errors = [];

  // 1. Full Name Validation
  if (!fullName || !fullName.trim()) {
    errors.push({ field: 'fullName', message: 'Full name is required.' });
  } else if (!/^[a-zA-Z\s]{2,50}$/.test(fullName.trim())) {
    errors.push({ field: 'fullName', message: 'Full name must be 2-50 characters (letters and spaces only).' });
  }

  // 2. Company Name Validation
  if (!companyName || !companyName.trim()) {
    errors.push({ field: 'companyName', message: 'Company name is required.' });
  } else if (companyName.trim().length < 2 || companyName.trim().length > 100) {
    errors.push({ field: 'companyName', message: 'Company name must be between 2 and 100 characters.' });
  }

  // 3. Email Validation
  if (!email || !email.trim()) {
    errors.push({ field: 'email', message: 'Email address is required.' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.push({ field: 'email', message: 'Please enter a valid email address.' });
  }

  // 4. Phone Number Validation
  if (!phoneNumber || !phoneNumber.trim()) {
    errors.push({ field: 'phoneNumber', message: 'Phone number is required.' });
  } else if (!/^\+?[0-9\s\-()]{7,20}$/.test(phoneNumber.trim())) {
    errors.push({ field: 'phoneNumber', message: 'Please enter a valid phone number (7-20 digits).' });
  }

  // 5. Message Validation
  if (!message || !message.trim()) {
    errors.push({ field: 'message', message: 'Message is required.' });
  } else if (message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters long.' });
  } else if (message.trim().length > 1000) {
    errors.push({ field: 'message', message: 'Message cannot exceed 1000 characters.' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const receiverEmail = process.env.RECEIVER_EMAIL || 'ansarpanoor311@gmail.com';

  const mailOptions = {
    from: process.env.SMTP_USER || '"BackDrops Site Form" <no-reply@backdrops.ae>',
    to: receiverEmail,
    subject: `New Contact Form Inquiry from ${fullName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Company:</strong> ${companyName || 'N/A'}</p>
      <p><strong>Email Address:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f9f9f9; border-left: 5px solid #ccc; padding: 10px 15px; margin: 10px 0;">
        ${message.replace(/\n/g, '<br>') || 'N/A'}
      </blockquote>
    `
  };

  try {
    if (!transporter) {
      throw new Error('Nodemailer transporter is not initialized.');
    }
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully: ${info.messageId}`);
    
    // If using Ethereal, print preview link
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`Preview URL: ${previewUrl}`);
      return res.json({ 
        success: true, 
        message: 'Form submitted successfully (Test Mode).', 
        previewUrl 
      });
    }

    return res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Nodemailer error:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email. Internal server error.' });
  }
});

// 2. Endpoint: File Upload (Multer)
app.post('/api/upload', upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, error: 'No files uploaded.' });
    }
    
    const filesInfo = req.files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      size: file.size,
      path: file.path
    }));

    console.log(`Successfully uploaded ${req.files.length} file(s).`);
    return res.json({
      success: true,
      message: 'Files uploaded successfully!',
      files: filesInfo
    });
  } catch (error) {
    console.error('File upload error:', error);
    return res.status(500).json({ success: false, error: 'File upload failed.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
