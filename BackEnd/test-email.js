const nodemailer = require('nodemailer');
require('dotenv').config();

async function test() {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  console.log(`SMTP_USER: ${smtpUser}`);
  console.log(`SMTP_PASS: ${smtpPass ? '******' : 'undefined'}`);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  try {
    console.log("Verifying connection...");
    await transporter.verify();
    console.log("Connection verified successfully!");

    console.log("Sending test email...");
    const info = await transporter.sendMail({
      from: smtpUser,
      to: smtpUser,
      subject: "Test email from local backdrops test script",
      text: "If you receive this, SMTP is working perfectly!"
    });
    console.log("Email sent successfully! MessageId:", info.messageId);
  } catch (error) {
    console.error("Nodemailer error during test:", error);
  }
}

test();
