const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'backdrops_super_secret_key_2026_@_!';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB successfully.');
    try {
      const delResult = await Stand.deleteMany({ "images.publicId": "static_seed" });
      if (delResult.deletedCount > 0) {
        console.log(`Removed ${delResult.deletedCount} previously seeded static stands from MongoDB.`);
      }
    } catch (cleanErr) {
      console.error('Error cleaning up static stands:', cleanErr);
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

async function seedStaticStands() {
  try {
    const staticStandsData = [
      {
        title: "BEX Exhibition Pavilion",
        area: 45,
        image: "/assets/1-1024x768.jpeg",
        category: "UAE projects",
        typeOfStand: "peninsula stand",
        year: 2025,
        client: "BEX Group",
        location: "Dubai, UAE"
      },
      {
        title: "Almaty Pavilion Stand",
        area: 28,
        image: "/assets/1-1-1024x768.jpeg",
        category: "International projects",
        typeOfStand: "Inline/ linear stand",
        year: 2024,
        client: "Almaty Expo",
        location: "Almaty, Kazakhstan"
      },
      {
        title: "Corporate Tech Expo Booth",
        area: 60,
        image: "/assets/1-3-1024x768.jpeg",
        category: "GCC projects",
        typeOfStand: "peninsula stand",
        year: 2023,
        client: "TechCorp",
        location: "Riyadh, Saudi Arabia"
      },
      {
        title: "Automotive Exhibit Zone",
        area: 120,
        image: "/assets/btd1wkac03853ntp8l0e3vox6v3dunyi-1024x768.jpg",
        category: "UAE projects",
        typeOfStand: "island stand",
        year: 2025,
        client: "Apex Auto",
        location: "Dubai, UAE"
      },
      {
        title: "Eco-Friendly Brand Stand",
        area: 35,
        image: "/assets/02-1024x768.jpg",
        category: "UAE projects",
        typeOfStand: "peninsula stand",
        year: 2024,
        client: "EcoGreen",
        location: "Abu Dhabi, UAE"
      },
      {
        title: "Telecom Solutions Zone",
        area: 50,
        image: "/assets/1-8-1024x768.jpg",
        category: "GCC projects",
        typeOfStand: "peninsula stand",
        year: 2023,
        client: "Telecom Global",
        location: "Doha, Qatar"
      },
      {
        title: "Premium Retail Expo Booth",
        area: 40,
        image: "/assets/2_web-1024x768.jpg",
        category: "UAE projects",
        typeOfStand: "peninsula stand",
        year: 2026,
        client: "Luxe Retail",
        location: "Dubai, UAE"
      },
      {
        title: "Aerospace Exhibition Pavilion",
        area: 150,
        image: "/assets/1_web-1-1024x768.jpg",
        category: "International projects",
        typeOfStand: "island stand",
        year: 2025,
        client: "AeroSpace Intl",
        location: "London, UK"
      },
      {
        title: "Real Estate Display Stand",
        area: 75,
        image: "/assets/showroom_retail_design.png",
        category: "GCC projects",
        typeOfStand: "peninsula stand",
        year: 2024,
        client: "Emaar Properties",
        location: "Dubai, UAE"
      },
      {
        title: "Health & Pharma Stand",
        area: 30,
        image: "/assets/workspace_meeting.png",
        category: "UAE projects",
        typeOfStand: "Inline/ linear stand",
        year: 2022,
        client: "PharmaCare",
        location: "Dubai, UAE"
      }
    ];

    for (const item of staticStandsData) {
      const exists = await Stand.findOne({ showName: item.title });
      if (!exists) {
        await Stand.create({
          typeOfStands: [item.typeOfStand],
          typeOfEvents: ["trade shows and exhibition"],
          year: item.year,
          categories: [item.category],
          showName: item.title,
          standArea: item.area,
          location: item.location,
          client: item.client,
          images: [{ url: item.image, publicId: "static_seed" }]
        });
      }
    }
    console.log('Static stands checked and seeded successfully into MongoDB.');
  } catch (err) {
    console.error('Error seeding static stands:', err);
  }
}

// Admin/User Schemas (flexible search in either 'admins' or 'users' collection)
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
}, { collection: 'admins', strict: false });

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
}, { collection: 'users', strict: false });

const Admin = mongoose.model('Admin', adminSchema);
const User = mongoose.model('User', userSchema);

// Stand Schema & Model
const standSchema = new mongoose.Schema({
  typeOfStands: { type: [String], required: true },
  typeOfEvents: { type: [String], required: true },
  year: { type: Number, required: true },
  categories: { type: [String], required: true },
  showName: { type: String, required: true },
  standArea: { type: Number, required: true }, // in sqm
  location: { type: String, required: true },
  client: { type: String, required: true },
  listed: { type: Boolean, default: true },
  images: [{
    url: { type: String, required: true },
    publicId: { type: String, required: true }
  }]
}, { collection: 'stands', timestamps: true });

const Stand = mongoose.model('Stand', standSchema);

// Gallery Photo Schema & Model
const galleryPhotoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true }
}, { collection: 'galleryPhotos', timestamps: true });

const GalleryPhoto = mongoose.model('GalleryPhoto', galleryPhotoSchema);

// Video Case Schema & Model
const videoCaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeUrl: { type: String, required: true },
  youtubeId: { type: String, required: true },
  duration: { type: String, default: '00:00' }
}, { collection: 'videocases', timestamps: true });
const VideoCase = mongoose.model('VideoCase', videoCaseSchema);

// Client Video Schema & Model
const clientVideoSchema = new mongoose.Schema({
  youtubeUrl: { type: String, required: true },
  youtubeId: { type: String, required: true }
}, { collection: 'clientvideos', timestamps: true });

const ClientVideo = mongoose.model('ClientVideo', clientVideoSchema);

// Review Schema & Model
const reviewSchema = new mongoose.Schema({
  starRating: { type: Number, required: true },
  name: { type: String, required: true },
  company: { type: String, required: false },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, { collection: 'reviews', timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

const corsOptions = {
  origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
};

app.use(cors(corsOptions));
app.options(/^(.*)$/, cors(corsOptions));
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
      port: 465,
      secure: true, // true for 465, false for other ports
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

// JWT verification middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ success: false, error: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ success: false, error: 'Malformed token.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, error: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
  });
};

// Admin login endpoint (handles both bcrypt hashes and direct plain text for manual entries)
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required.' });
  }

  try {
    const trimmedEmail = email.trim();
    // Search in both admins and users collections
    let adminDoc = await Admin.findOne({ email: trimmedEmail });
    if (!adminDoc) {
      adminDoc = await User.findOne({ email: trimmedEmail });
    }

    if (!adminDoc) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    // Compare passwords: support both bcrypt hash and plain text fallback
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, adminDoc.password);
    } catch (err) {
      isMatch = false;
    }

    // Fallback to plain text comparison
    if (!isMatch) {
      isMatch = (password === adminDoc.password);
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: adminDoc._id, email: adminDoc.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      token,
      admin: {
        id: adminDoc._id,
        email: adminDoc.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// Admin verify token endpoint
app.get('/api/auth/verify', verifyToken, (req, res) => {
  res.json({
    success: true,
    admin: {
      id: req.userId,
      email: req.userEmail
    }
  });
});

// Diagnostics and testing endpoints removed


// 1. Endpoint: Form Submission Email Forwarding



app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running"
  });
});
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
        <p>&copy; ${new Date().getFullYear()} <a href="https://www.bexdxb.com" style="color: #9E5330;">Backdrops Technical Services L.L.C</a>. All rights reserved.</p>
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

// 1b. Endpoint: Fill Out Brief Form Submission
app.post('/api/brief', upload.array('attachments', 10), async (req, res) => {
  const {
    bFullName, bCompany, bEmail, bPhone, bCountry,
    bProjectType, bProjectName, bEventVenue, bProjectLocation,
    bStandSize, bDescription, bScope, bEventDate, bBudget
  } = req.body;

  // Basic server-side validation
  const errors = [];
  if (!bFullName || bFullName.trim().length < 2) errors.push('Full name is required (min 2 chars).');
  if (!bCompany || bCompany.trim().length < 2) errors.push('Company name is required.');
  if (!bEmail || !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(bEmail.trim())) errors.push('Valid email address is required.');
  if (!bPhone || bPhone.trim().length < 7) errors.push('Valid phone number is required.');
  if (!bCountry || bCountry.trim().length < 2) errors.push('Country / Location is required.');
  if (!bProjectType) errors.push('At least one project type must be selected.');
  if (!bProjectLocation || bProjectLocation.trim().length < 3) errors.push('Project location is required.');
  if (!bDescription || bDescription.trim().length < 20) errors.push('Description must be at least 20 characters.');
  if (!bEventDate) errors.push('Event / deadline date is required.');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const receiverEmail = process.env.RECEIVER_EMAIL || 'ansarpanoor311@gmail.com';

  // Parse arrays sent from frontend (may come as JSON string or comma-separated)
  const parseList = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    try { return JSON.parse(val); } catch { return val.split(',').map(s => s.trim()).filter(Boolean); }
  };
  const projectTypes = parseList(bProjectType);
  const scopeList   = parseList(bScope);

  // Prepare attachments for nodemailer
  const attachments = (req.files || []).map(file => ({
    filename: file.originalname,
    path: file.path
  }));

  const rowStyle = 'padding:12px 0;border-bottom:1px solid #f0f2f5;font-size:15px;vertical-align:top;';
  const labelStyle = 'width:32%;font-weight:700;color:#9E5330;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;';
  const valueStyle = 'color:#2D3748;font-size:15px;';

  const row = (label, value) => value ? `
    <tr>
      <td style="${rowStyle}${labelStyle}">${label}</td>
      <td style="${rowStyle}${valueStyle}">${value}</td>
    </tr>` : '';

  const mailOptions = {
    from: process.env.SMTP_USER || '"BEX Brief Form" <no-reply@bexdxb.com>',
    to: receiverEmail,
    subject: `📋 New Project Brief from ${bFullName} — ${projectTypes.join(', ')}`,
    attachments,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>New Project Brief</title>
</head>
<body style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#f6f8fa;color:#333;margin:0;padding:0;">
  <div style="width:100%;background:#f6f8fa;padding:40px 20px;box-sizing:border-box;">
    <div style="max-width:650px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);border:1px solid #e1e8ed;">

      <!-- Header -->
      <div style="background:#0B0C10;padding:36px 40px;text-align:center;border-bottom:4px solid #9E5330;">
        <h1 style="color:#fff;font-size:28px;font-weight:900;letter-spacing:3px;margin:0;text-transform:uppercase;">BEX</h1>
        <p style="color:#9E5330;font-size:13px;margin:8px 0 0;letter-spacing:2px;text-transform:uppercase;">New Project Brief Submission</p>
      </div>

      <!-- Body -->
      <div style="padding:40px;">
        <p style="font-size:16px;color:#555;margin:0 0 28px;line-height:1.6;">A new project brief has been submitted through the website. Full details are below.</p>

        <!-- Section 1: Contact -->
        <div style="background:#FAF6F4;border-left:4px solid #9E5330;padding:14px 20px;margin-bottom:6px;border-radius:4px;">
          <p style="margin:0;font-size:12px;font-weight:800;color:#9E5330;text-transform:uppercase;letter-spacing:1px;">1 — Contact Information</p>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
          ${row('Full Name', `<strong>${bFullName}</strong>`)}
          ${row('Company / Agency', bCompany)}
          ${row('Email', `<a href="mailto:${bEmail}" style="color:#9E5330;text-decoration:none;">${bEmail}</a>`)}
          ${row('Phone', bPhone)}
          ${row('Country / Location', bCountry)}
        </table>

        <!-- Section 2: Project Info -->
        <div style="background:#FAF6F4;border-left:4px solid #9E5330;padding:14px 20px;margin-bottom:6px;border-radius:4px;">
          <p style="margin:0;font-size:12px;font-weight:800;color:#9E5330;text-transform:uppercase;letter-spacing:1px;">2 — Project Information</p>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
          ${row('Project Type(s)', projectTypes.join(' &bull; '))}
          ${row('Project Name', bProjectName)}
          ${row('Event / Venue', bEventVenue)}
          ${row('Project Location', bProjectLocation)}
          ${row('Stand Size', bStandSize)}
        </table>

        <!-- Section 3: Requirements -->
        <div style="background:#FAF6F4;border-left:4px solid #9E5330;padding:14px 20px;margin-bottom:6px;border-radius:4px;">
          <p style="margin:0;font-size:12px;font-weight:800;color:#9E5330;text-transform:uppercase;letter-spacing:1px;">3 — Project Requirements</p>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
          ${row('Scope of Services', scopeList.length ? scopeList.join(' &bull; ') : 'Not specified')}
        </table>
        <div style="background:#FAF6F4;border-left:4px solid #9E5330;padding:20px 24px;border-radius:4px;margin-bottom:28px;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:800;color:#9E5330;text-transform:uppercase;letter-spacing:0.5px;">Project Description</p>
          <p style="margin:0;font-size:15px;line-height:1.7;color:#2D3748;">${(bDescription || '').replace(/\n/g, '<br>')}</p>
        </div>

        <!-- Section 4: Timeline & Budget -->
        <div style="background:#FAF6F4;border-left:4px solid #9E5330;padding:14px 20px;margin-bottom:6px;border-radius:4px;">
          <p style="margin:0;font-size:12px;font-weight:800;color:#9E5330;text-transform:uppercase;letter-spacing:1px;">4 — Timeline &amp; Budget</p>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
          ${row('Event / Deadline Date', bEventDate ? new Date(bEventDate).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' }) : '')}
          ${row('Estimated Budget', bBudget || 'Not specified')}
        </table>

        <!-- Attachments notice -->
        ${attachments.length > 0 ? `
        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:6px;padding:14px 20px;margin-bottom:28px;">
          <p style="margin:0;font-size:14px;color:#166534;font-weight:600;">📎 ${attachments.length} attachment(s) included with this email.</p>
        </div>` : ''}
      </div>

      <!-- Footer -->
      <div style="background:#f8fafc;padding:24px 40px;text-align:center;border-top:1px solid #e1e8ed;font-size:12px;color:#718096;line-height:1.6;">
        <p style="margin:0;">This brief was automatically submitted via the project brief form on your website.</p>
        <p style="margin:6px 0 0;">&copy; ${new Date().getFullYear()} <a href="https://www.bexdxb.com" style="color:#9E5330;text-decoration:none;">Backdrops Technical Services L.L.C</a>. All rights reserved.</p>
      </div>

    </div>
  </div>
</body>
</html>`
  };

  try {
    if (!transporter) throw new Error('Mailer not initialized.');
    const info = await transporter.sendMail(mailOptions);
    console.log(`Brief email sent: ${info.messageId}`);
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) console.log(`Brief preview: ${previewUrl}`);

    // Clean up uploaded temp files
    (req.files || []).forEach(f => { try { fs.unlinkSync(f.path); } catch {} });

    return res.json({ success: true, message: 'Brief submitted and email sent successfully!' });
  } catch (error) {
    console.error('Brief email error:', error);
    return res.status(500).json({ success: false, error: 'Failed to send brief email.' });
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

// 3. Endpoints: Stands Management (Cloudinary + MongoDB)

// POST /api/stands - Create a new stand (protected by verifyToken, uploads images to Cloudinary)
app.post('/api/stands', verifyToken, upload.array('images', 10), async (req, res) => {
  const localFiles = req.files || [];
  const uploadedImages = [];

  try {
    // Extract metadata
    const { 
      typeOfStands, 
      typeOfEvents, 
      year, 
      categories, 
      showName, 
      showname,
      standArea, 
      location, 
      client 
    } = req.body;

    // Check if files are uploaded
    if (localFiles.length === 0) {
      return res.status(400).json({ success: false, error: 'At least one image is required.' });
    }

    // Required field validation
    const targetTypeOfStands = typeOfStands || req.body['Type of Stands'];
    const targetTypeOfEvents = typeOfEvents || req.body['Type of Events'];
    const targetYear = year || req.body['Year'];
    const targetCategories = categories || req.body['Categories'];
    const targetShowName = showName || showname || req.body['showName'] || req.body['showname'];
    const targetStandArea = standArea || req.body['standArea'] || req.body['standArea (sqm)'];
    const targetLocation = location || req.body['Location'];
    const targetClient = client || req.body['Client'];

    if (!targetTypeOfStands || !targetTypeOfEvents || !targetYear || !targetShowName || !targetStandArea || !targetLocation || !targetClient || !targetCategories) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields. Please ensure Type of Stands, Type of Events, Year, Categories, showname, standArea, Location, and Client are provided.' 
      });
    }

    // String length validations
    if (targetShowName.trim().length < 3 || targetShowName.trim().length > 100) {
      return res.status(400).json({ success: false, error: 'Show Name must be between 3 and 100 characters.' });
    }
    if (targetClient.trim().length < 2 || targetClient.trim().length > 100) {
      return res.status(400).json({ success: false, error: 'Client Name must be between 2 and 100 characters.' });
    }
    if (targetLocation.trim().length < 3 || targetLocation.trim().length > 200) {
      return res.status(400).json({ success: false, error: 'Location must be between 3 and 200 characters.' });
    }

    // Parse helper
    const parseArray = (value) => {
      if (!value) return [];
      if (Array.isArray(value)) return value;
      if (typeof value === 'string') {
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) return parsed;
        } catch (e) {}
        return value.split(',').map(s => s.trim()).filter(Boolean);
      }
      return [value];
    };

    const typeOfStandsArray = parseArray(targetTypeOfStands);
    const typeOfEventsArray = parseArray(targetTypeOfEvents);
    const categoriesArray = parseArray(targetCategories);

    // Multi-select presence check
    if (typeOfStandsArray.length === 0) {
      return res.status(400).json({ success: false, error: 'At least one Stand Type must be selected.' });
    }
    if (typeOfEventsArray.length === 0) {
      return res.status(400).json({ success: false, error: 'At least one Event Type must be selected.' });
    }

    // Predefined values validation
    const ALLOWED_STAND_TYPES = [
      'double decker stand', 'corner stand', 'peninsula stand', 'island stand',
      'custom / built stand', 'Inline/ linear stand', 'Smart stands', 'outdoor stands'
    ];
    const ALLOWED_EVENT_TYPES = [
      'trade shows and exhibition', 'conference', 'forum', 'product launches',
      'Festivals & concerts', 'brand activation', 'sports events', 'corporate events', 'congress'
    ];
    const ALLOWED_CATEGORIES = [
      'UAE projects', 'GCC projects', 'International projects'
    ];

    const hasInvalidStand = typeOfStandsArray.some(val => !ALLOWED_STAND_TYPES.includes(val));
    if (hasInvalidStand) {
      return res.status(400).json({ success: false, error: 'One or more selected Stand Types are invalid.' });
    }
    const hasInvalidEvent = typeOfEventsArray.some(val => !ALLOWED_EVENT_TYPES.includes(val));
    if (hasInvalidEvent) {
      return res.status(400).json({ success: false, error: 'One or more selected Event Types are invalid.' });
    }
    const hasInvalidCategory = categoriesArray.some(val => !ALLOWED_CATEGORIES.includes(val));
    if (hasInvalidCategory || categoriesArray.length === 0) {
      return res.status(400).json({ success: false, error: 'Please select a valid Category (UAE, GCC, or International Projects).' });
    }

    // Numeric parsing and range checks
    const parsedYear = parseInt(targetYear, 10);
    const currentYear = new Date().getFullYear();
    if (isNaN(parsedYear) || parsedYear < 2000 || parsedYear > currentYear + 10) {
      return res.status(400).json({ success: false, error: `Year must be between 2000 and ${currentYear + 10}.` });
    }

    const parsedArea = parseFloat(targetStandArea);
    if (isNaN(parsedArea) || parsedArea <= 0 || parsedArea > 100000) {
      return res.status(400).json({ success: false, error: 'Stand Area must be a positive number greater than 0.' });
    }

    // Upload files to Cloudinary
    for (const file of localFiles) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'backdrops/stands'
      });
      uploadedImages.push({
        url: result.secure_url,
        publicId: result.public_id
      });
    }

    // Create MongoDB Stand Document
    const stand = new Stand({
      typeOfStands: typeOfStandsArray,
      typeOfEvents: typeOfEventsArray,
      year: parseInt(targetYear, 10),
      categories: categoriesArray,
      showName: targetShowName,
      standArea: parseFloat(targetStandArea),
      location: targetLocation,
      client: targetClient,
      images: uploadedImages,
      listed: true
    });

    await stand.save();

    return res.status(201).json({
      success: true,
      message: 'Stand created successfully!',
      stand
    });

  } catch (error) {
    console.error('Error creating stand:', error);

    // Rollback uploaded files on Cloudinary if DB save or other steps failed
    if (uploadedImages.length > 0) {
      console.log('Rolling back uploaded Cloudinary images...');
      for (const image of uploadedImages) {
        try {
          await cloudinary.uploader.destroy(image.publicId);
        } catch (delErr) {
          console.error(`Failed to delete orphaned Cloudinary image ${image.publicId}:`, delErr);
        }
      }
    }

    return res.status(500).json({ 
      success: false, 
      error: 'Failed to create stand. ' + error.message 
    });
  } finally {
    // Always clean up local temporary upload files
    for (const file of localFiles) {
      if (fs.existsSync(file.path)) {
        try {
          fs.unlinkSync(file.path);
        } catch (unlinkErr) {
          console.error(`Failed to clean up local file ${file.path}:`, unlinkErr);
        }
      }
    }
  }
});

// GET /api/stands - Retrieve stands with backend pagination, search, and filtering
app.get('/api/stands', async (req, res) => {
  try {
    const { page = 1, limit = 9, typeOfStand, typeOfEvent, category, year, search } = req.query;

    const authHeader = req.headers['authorization'];
    let isAdmin = false;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      if (token) {
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          if (decoded) {
            isAdmin = true;
          }
        } catch (e) {}
      }
    }

    const query = {};
    if (!isAdmin) {
      query.listed = { $ne: false };
    }

    // 1. Search Query (matches showName, client, or location case-insensitively)
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { showName: searchRegex },
        { client: searchRegex },
        { location: searchRegex }
      ];
    }

    // 2. Stand Type Filter
    if (typeOfStand && typeOfStand !== 'ALL') {
      // Matches stand types case insensitively
      query.typeOfStands = { $in: [new RegExp(typeOfStand, 'i')] };
    }

    // 2b. Event Type Filter
    if (typeOfEvent && typeOfEvent !== 'ALL') {
      query.typeOfEvents = { $in: [new RegExp(typeOfEvent, 'i')] };
    }

    // 3. Category Filter
    if (category && category !== 'ALL') {
      query.categories = { $in: [new RegExp(category, 'i')] };
    }

    // 4. Year Filter (supports "2022_BELOW" or exact year)
    if (year && year !== 'ALL') {
      if (year === '2022_BELOW') {
        query.year = { $lte: 2022 };
      } else {
        const parsedYear = parseInt(year, 10);
        if (!isNaN(parsedYear)) {
          query.year = parsedYear;
        }
      }
    }

    // Pagination calculations
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, parseInt(limit, 10));
    const skip = (pageNum - 1) * limitNum;

    // Execute query with skip, limit, and sort
    const totalCount = await Stand.countDocuments(query);
    const stands = await Stand.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const totalPages = Math.ceil(totalCount / limitNum);

    return res.json({
      success: true,
      count: stands.length,
      stands,
      pagination: {
        totalCount,
        totalPages,
        currentPage: pageNum,
        limit: limitNum
      }
    });
  } catch (error) {
    console.error('Error fetching stands:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch stands. ' + error.message });
  }
});

// GET /api/stands/:id - Retrieve a single stand (public)
app.get('/api/stands/:id', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    let isAdmin = false;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      if (token) {
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          if (decoded) {
            isAdmin = true;
          }
        } catch (e) {}
      }
    }

    const stand = await Stand.findById(req.params.id);
    if (!stand || (!isAdmin && stand.listed === false)) {
      return res.status(404).json({ success: false, error: 'Stand not found.' });
    }
    return res.json({ success: true, stand });
  } catch (error) {
    console.error('Error fetching stand:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch stand.' });
  }
});

// DELETE /api/stands/:id - Delete a stand and its Cloudinary images (protected by verifyToken)
app.delete('/api/stands/:id', verifyToken, async (req, res) => {
  try {
    const stand = await Stand.findById(req.params.id);
    if (!stand) {
      return res.status(404).json({ success: false, error: 'Stand not found.' });
    }

    // Delete associated images from Cloudinary
    if (stand.images && stand.images.length > 0) {
      for (const image of stand.images) {
        try {
          await cloudinary.uploader.destroy(image.publicId);
          console.log(`Deleted image ${image.publicId} from Cloudinary.`);
        } catch (clDelErr) {
          console.error(`Failed to delete image ${image.publicId} from Cloudinary:`, clDelErr);
        }
      }
    }

    // Remove from MongoDB
    await Stand.findByIdAndDelete(req.params.id);

    return res.json({ success: true, message: 'Stand and its images deleted successfully.' });
  } catch (error) {
    console.error('Error deleting stand:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete stand.' });
  }
});

// PUT /api/stands/:id - Update an existing stand (protected by verifyToken, optional image upload)
app.put('/api/stands/:id', verifyToken, upload.array('images', 10), async (req, res) => {
  const localFiles = req.files || [];
  const newlyUploadedImages = [];

  try {
    const stand = await Stand.findById(req.params.id);
    if (!stand) {
      return res.status(404).json({ success: false, error: 'Stand not found.' });
    }

    // Extract metadata
    const { 
      typeOfStands, 
      typeOfEvents, 
      year, 
      categories, 
      showName, 
      showname,
      standArea, 
      location, 
      client,
      existingImages // JSON string or list of images to keep
    } = req.body;

    // Required field validation
    const targetTypeOfStands = typeOfStands || req.body['Type of Stands'];
    const targetTypeOfEvents = typeOfEvents || req.body['Type of Events'];
    const targetYear = year || req.body['Year'];
    const targetCategories = categories || req.body['Categories'];
    const targetShowName = showName || showname || req.body['showName'] || req.body['showname'];
    const targetStandArea = standArea || req.body['standArea'] || req.body['standArea (sqm)'];
    const targetLocation = location || req.body['Location'];
    const targetClient = client || req.body['Client'];

    if (!targetTypeOfStands || !targetTypeOfEvents || !targetYear || !targetShowName || !targetStandArea || !targetLocation || !targetClient || !targetCategories) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields. Please ensure Type of Stands, Type of Events, Year, Categories, showname, standArea, Location, and Client are provided.' 
      });
    }

    // String length validations
    if (targetShowName.trim().length < 3 || targetShowName.trim().length > 100) {
      return res.status(400).json({ success: false, error: 'Show Name must be between 3 and 100 characters.' });
    }
    if (targetClient.trim().length < 2 || targetClient.trim().length > 100) {
      return res.status(400).json({ success: false, error: 'Client Name must be between 2 and 100 characters.' });
    }
    if (targetLocation.trim().length < 3 || targetLocation.trim().length > 200) {
      return res.status(400).json({ success: false, error: 'Location must be between 3 and 200 characters.' });
    }

    // Parse helper
    const parseArray = (value) => {
      if (!value) return [];
      if (Array.isArray(value)) return value;
      if (typeof value === 'string') {
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) return parsed;
        } catch (e) {}
        return value.split(',').map(s => s.trim()).filter(Boolean);
      }
      return [value];
    };

    const typeOfStandsArray = parseArray(targetTypeOfStands);
    const typeOfEventsArray = parseArray(targetTypeOfEvents);
    const categoriesArray = parseArray(targetCategories);

    // Multi-select presence check
    if (typeOfStandsArray.length === 0) {
      return res.status(400).json({ success: false, error: 'At least one Stand Type must be selected.' });
    }
    if (typeOfEventsArray.length === 0) {
      return res.status(400).json({ success: false, error: 'At least one Event Type must be selected.' });
    }

    // Predefined values validation
    const ALLOWED_STAND_TYPES = [
      'double decker stand', 'corner stand', 'peninsula stand', 'island stand',
      'custom / built stand', 'Inline/ linear stand', 'Smart stands', 'outdoor stands'
    ];
    const ALLOWED_EVENT_TYPES = [
      'trade shows and exhibition', 'conference', 'forum', 'product launches',
      'Festivals & concerts', 'brand activation', 'sports events', 'corporate events', 'congress'
    ];
    const ALLOWED_CATEGORIES = [
      'UAE projects', 'GCC projects', 'International projects'
    ];

    const hasInvalidStand = typeOfStandsArray.some(val => !ALLOWED_STAND_TYPES.includes(val));
    if (hasInvalidStand) {
      return res.status(400).json({ success: false, error: 'One or more selected Stand Types are invalid.' });
    }
    const hasInvalidEvent = typeOfEventsArray.some(val => !ALLOWED_EVENT_TYPES.includes(val));
    if (hasInvalidEvent) {
      return res.status(400).json({ success: false, error: 'One or more selected Event Types are invalid.' });
    }
    const hasInvalidCategory = categoriesArray.some(val => !ALLOWED_CATEGORIES.includes(val));
    if (hasInvalidCategory || categoriesArray.length === 0) {
      return res.status(400).json({ success: false, error: 'Please select a valid Category (UAE, GCC, or International Projects).' });
    }

    // Numeric parsing and range checks
    const parsedYear = parseInt(targetYear, 10);
    const currentYear = new Date().getFullYear();
    if (isNaN(parsedYear) || parsedYear < 2000 || parsedYear > currentYear + 10) {
      return res.status(400).json({ success: false, error: `Year must be between 2000 and ${currentYear + 10}.` });
    }

    const parsedArea = parseFloat(targetStandArea);
    if (isNaN(parsedArea) || parsedArea <= 0 || parsedArea > 100000) {
      return res.status(400).json({ success: false, error: 'Stand Area must be a positive number greater than 0 sqm.' });
    }

    // Parse existing images to keep
    const parsedExistingImages = parseArray(existingImages);
    const imagesToKeep = [];
    const imagesToRemove = [];

    if (stand.images && stand.images.length > 0) {
      for (const img of stand.images) {
        const keep = parsedExistingImages.some(item => {
          if (typeof item === 'string') {
            return item === img.url || item === img.publicId;
          }
          return item.url === img.url || item.publicId === img.publicId || item._id === img._id?.toString();
        });

        if (keep) {
          imagesToKeep.push(img);
        } else {
          imagesToRemove.push(img);
        }
      }
    }

    // At least one image must remain
    if (imagesToKeep.length === 0 && localFiles.length === 0) {
      return res.status(400).json({ success: false, error: 'At least one image is required for the stand project.' });
    }

    // Delete removed images from Cloudinary
    for (const img of imagesToRemove) {
      try {
        await cloudinary.uploader.destroy(img.publicId);
        console.log(`Deleted image ${img.publicId} from Cloudinary on update.`);
      } catch (delErr) {
        console.error(`Failed to delete Cloudinary image ${img.publicId}:`, delErr);
      }
    }

    // Upload newly added files to Cloudinary
    for (const file of localFiles) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'backdrops/stands'
      });
      newlyUploadedImages.push({
        url: result.secure_url,
        publicId: result.public_id
      });
    }

    // Update document fields
    stand.typeOfStands = typeOfStandsArray;
    stand.typeOfEvents = typeOfEventsArray;
    stand.year = parsedYear;
    stand.categories = categoriesArray;
    stand.showName = targetShowName;
    stand.standArea = parsedArea;
    stand.location = targetLocation;
    stand.client = targetClient;
    stand.images = [...imagesToKeep, ...newlyUploadedImages];

    await stand.save();

    return res.json({
      success: true,
      message: 'Stand updated successfully!',
      stand
    });

  } catch (error) {
    console.error('Error updating stand:', error);

    // Rollback newly uploaded images if something failed
    if (newlyUploadedImages.length > 0) {
      console.log('Rolling back new Cloudinary images due to update error...');
      for (const image of newlyUploadedImages) {
        try {
          await cloudinary.uploader.destroy(image.publicId);
        } catch (delErr) {
          console.error(`Failed to delete orphaned Cloudinary image ${image.publicId}:`, delErr);
        }
      }
    }

    return res.status(500).json({ 
      success: false, 
      error: 'Failed to update stand. ' + error.message 
    });
  } finally {
    // Always clean up local temporary upload files
    for (const file of localFiles) {
      if (fs.existsSync(file.path)) {
        try {
          fs.unlinkSync(file.path);
        } catch (unlinkErr) {
          console.error(`Failed to clean up local file ${file.path}:`, unlinkErr);
        }
      }
    }
  }
});

// PATCH /api/stands/:id/toggle-listed - Toggle a stand's listed/unlisted status (protected by verifyToken)
app.patch('/api/stands/:id/toggle-listed', verifyToken, async (req, res) => {
  try {
    const stand = await Stand.findById(req.params.id);
    if (!stand) {
      return res.status(404).json({ success: false, error: 'Stand not found.' });
    }

    stand.listed = stand.listed === false ? true : false;
    await stand.save();

    return res.json({
      success: true,
      message: `Stand status updated to ${stand.listed ? 'listed' : 'unlisted'}.`,
      stand
    });
  } catch (error) {
    console.error('Error toggling stand listed status:', error);
    return res.status(500).json({ success: false, error: 'Failed to update stand status.' });
  }
});

// ================= GALLERY PHOTO ENDPOINTS =================

// GET /api/gallery - Fetch all gallery photos
app.get('/api/gallery', async (req, res) => {
  try {
    const photos = await GalleryPhoto.find().sort({ createdAt: -1 });
    return res.json({ success: true, photos });
  } catch (error) {
    console.error('Error fetching gallery photos:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch gallery photos.' });
  }
});

// POST /api/gallery - Upload gallery photos (protected)
app.post('/api/gallery', verifyToken, upload.array('images', 20), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, error: 'No images provided.' });
  }

  const uploadedImages = [];

  try {
    // Upload files to Cloudinary
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'bex_gallery',
        use_filename: true,
        unique_filename: true
      });
      uploadedImages.push({
        url: result.secure_url,
        publicId: result.public_id
      });
    }

    // Save to MongoDB
    const photos = await GalleryPhoto.insertMany(uploadedImages);

    return res.status(201).json({
      success: true,
      message: 'Gallery photos uploaded successfully.',
      photos
    });
  } catch (error) {
    console.error('Error uploading gallery photos:', error);
    // Rollback uploaded Cloudinary images if DB fails
    for (const img of uploadedImages) {
      try {
        await cloudinary.uploader.destroy(img.publicId);
      } catch (delErr) {
        console.error(`Failed to delete orphaned Cloudinary image ${img.publicId}:`, delErr);
      }
    }
    return res.status(500).json({ success: false, error: 'Failed to upload gallery photos.' });
  } finally {
    // Clean up local temp files
    if (req.files) {
      for (const file of req.files) {
        try {
          fs.unlinkSync(file.path);
        } catch (err) {
          console.error(`Failed to clean up local file ${file.path}:`, err);
        }
      }
    }
  }
});

// DELETE /api/gallery/:id - Delete a gallery photo (protected)
app.delete('/api/gallery/:id', verifyToken, async (req, res) => {
  try {
    const photo = await GalleryPhoto.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ success: false, error: 'Photo not found.' });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(photo.publicId);

    // Delete from MongoDB
    await GalleryPhoto.findByIdAndDelete(req.params.id);

    return res.json({ success: true, message: 'Photo deleted successfully.' });
  } catch (error) {
    console.error('Error deleting gallery photo:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete gallery photo.' });
  }
});

// GET /api/videocases - Fetch all video cases
app.get('/api/videocases', async (req, res) => {
  try {
    const videocases = await VideoCase.find().sort({ createdAt: -1 });
    return res.json({ success: true, videocases });
  } catch (error) {
    console.error('Error fetching videocases:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch video cases.' });
  }
});

// POST /api/videocases - Add a new video case (protected)
app.post('/api/videocases', verifyToken, async (req, res) => {
  try {
    const { title, youtubeUrl, duration } = req.body;
    if (!title || !youtubeUrl) {
      return res.status(400).json({ success: false, error: 'Title and YouTube URL are required.' });
    }

    // Extract YouTube ID from URL
    let youtubeId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = youtubeUrl.match(regExp);
    if (match && match[2].length === 11) {
      youtubeId = match[2];
    } else {
      return res.status(400).json({ success: false, error: 'Invalid YouTube URL.' });
    }

    const newVideo = await VideoCase.create({ title, youtubeUrl, youtubeId, duration: duration || '00:00' });
    return res.status(201).json({ success: true, message: 'Video added successfully.', video: newVideo });
  } catch (error) {
    console.error('Error adding video case:', error);
    return res.status(500).json({ success: false, error: 'Failed to add video case.' });
  }
});

// DELETE /api/videocases/:id - Delete a video case (protected)
app.delete('/api/videocases/:id', verifyToken, async (req, res) => {
  try {
    const video = await VideoCase.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, error: 'Video not found.' });
    }
    return res.json({ success: true, message: 'Video deleted successfully.' });
  } catch (error) {
    console.error('Error deleting video case:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete video case.' });
  }
});

// GET /api/clientvideos - Fetch all client videos
app.get('/api/clientvideos', async (req, res) => {
  try {
    const clientvideos = await ClientVideo.find().sort({ createdAt: -1 });
    return res.json({ success: true, clientvideos });
  } catch (error) {
    console.error('Error fetching client videos:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch client videos.' });
  }
});

// POST /api/clientvideos - Add a new client video (protected)
app.post('/api/clientvideos', verifyToken, async (req, res) => {
  try {
    const { youtubeUrl } = req.body;
    if (!youtubeUrl) {
      return res.status(400).json({ success: false, error: 'YouTube URL is required.' });
    }

    // Extract YouTube ID from URL
    let youtubeId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = youtubeUrl.match(regExp);
    if (match && match[2].length === 11) {
      youtubeId = match[2];
    } else {
      return res.status(400).json({ success: false, error: 'Invalid YouTube URL.' });
    }

    const newVideo = await ClientVideo.create({ youtubeUrl, youtubeId });
    return res.status(201).json({ success: true, message: 'Client video added successfully.', video: newVideo });
  } catch (error) {
    console.error('Error adding client video:', error);
    return res.status(500).json({ success: false, error: 'Failed to add client video.' });
  }
});

// DELETE /api/clientvideos/:id - Delete a client video (protected)
app.delete('/api/clientvideos/:id', verifyToken, async (req, res) => {
  try {
    const video = await ClientVideo.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, error: 'Video not found.' });
    }
    return res.json({ success: true, message: 'Video deleted successfully.' });
  } catch (error) {
    console.error('Error deleting client video:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete client video.' });
  }
});

// ==========================================
// REVIEWS ENDPOINTS
// ==========================================

// GET /api/reviews - Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1, createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ success: false, error: 'Server error fetching reviews' });
  }
});

// POST /api/reviews - Create a review (protected)
app.post('/api/reviews', verifyToken, async (req, res) => {
  try {
    const { starRating, name, company, message, date } = req.body;
    
    if (!starRating || !name || !message || !date) {
      return res.status(400).json({ success: false, error: 'Star rating, name, date, and message are required.' });
    }

    const ratingNum = Number(starRating);
    if (isNaN(ratingNum) || ratingNum <= 0 || ratingNum > 5) {
      return res.status(400).json({ success: false, error: 'Star rating must be a number between 0.1 and 5.' });
    }

    const newReview = new Review({
      starRating: ratingNum,
      name: name.trim(),
      company: company ? company.trim() : '',
      message: message.trim(),
      date: new Date(date)
    });

    await newReview.save();
    res.status(201).json({ success: true, message: 'Review created successfully.', review: newReview });
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ success: false, error: 'Server error creating review' });
  }
});

// DELETE /api/reviews/:id - Delete a review (protected)
app.delete('/api/reviews/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) return res.status(404).json({ success: false, error: 'Review not found' });
    
    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ success: false, error: 'Server error deleting review' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
