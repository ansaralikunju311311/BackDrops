const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS dynamically for localhost and hosted environments
app.use(cors({
  origin: (origin, callback) => {
    // Allow all origins (including localhost, Vercel, and Render)
    callback(null, true);
  },
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
    subject: `⚡ New Contact Inquiry from ${fullName}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #f6f8fa;
      color: #333333;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f6f8fa;
      padding: 40px 20px;
      box-sizing: border-box;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      border: 1px solid #e1e8ed;
    }
    .header {
      background-color: #0B0C10;
      padding: 35px 40px;
      text-align: center;
      border-bottom: 4px solid #9E5330;
    }
    .header h1 {
      color: #ffffff;
      font-size: 26px;
      font-weight: 800;
      letter-spacing: 2px;
      margin: 0;
      text-transform: uppercase;
    }
    .header p {
      color: #A0A5B5;
      font-size: 14px;
      margin: 8px 0 0 0;
      letter-spacing: 1px;
    }
    .content {
      padding: 40px;
    }
    .intro {
      font-size: 16px;
      line-height: 1.6;
      color: #555555;
      margin-bottom: 30px;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    .info-table td {
      padding: 12px 0;
      border-bottom: 1px solid #f0f2f5;
      font-size: 15px;
      vertical-align: top;
    }
    .info-table td.label {
      width: 30%;
      font-weight: 700;
      color: #9E5330;
      text-transform: uppercase;
      font-size: 13px;
      letter-spacing: 0.5px;
    }
    .info-table td.value {
      color: #2D3748;
    }
    .message-box {
      background-color: #FAF6F4;
      border-left: 4px solid #9E5330;
      padding: 20px 25px;
      border-radius: 4px;
      margin-top: 10px;
    }
    .message-title {
      font-size: 13px;
      font-weight: 800;
      color: #9E5330;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
    }
    .message-text {
      font-size: 15px;
      line-height: 1.6;
      color: #2D3748;
      margin: 0;
    }
    .footer {
      background-color: #f8fafc;
      padding: 25px 40px;
      text-align: center;
      border-top: 1px solid #e1e8ed;
      font-size: 12px;
      color: #718096;
      line-height: 1.5;
    }
    .footer a {
      color: #9E5330;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>BackDrops</h1>
        <p>New Website Inquiry</p>
      </div>
      <div class="content">
        <p class="intro">Hello, you have received a new contact submission from your landing page. Here are the details:</p>
        <table class="info-table">
          <tr>
            <td class="label">Full Name</td>
            <td class="value"><strong>${fullName}</strong></td>
          </tr>
          <tr>
            <td class="label">Company</td>
            <td class="value">${companyName || 'N/A'}</td>
          </tr>
          <tr>
            <td class="label">Email</td>
            <td class="value"><a href="mailto:${email}" style="color: #9E5330; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td class="label">Phone</td>
            <td class="value">${phoneNumber || 'N/A'}</td>
          </tr>
        </table>
        
        <div class="message-box">
          <div class="message-title">Message Details</div>
          <p class="message-text">${message.replace(/\n/g, '<br>')}</p>
        </div>
      </div>
      <div class="footer">
        <p>This message was automatically generated from the contact form on your website.</p>
        <p>&copy; ${new Date().getFullYear()} <a href="https://backdrops.ae" style="color: #9E5330;">BackDrops FZE</a>. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
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
