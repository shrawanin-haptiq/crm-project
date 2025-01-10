import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: process.env.EMAIL_USER, // Email address
    pass: process.env.EMAIL_PASS, // App-specific password
  },
});

// Function to send an email
export const sendEmailToCustomer = async (customerEmail, customerName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: 'Welcome to Our Service!',
      html: `
        <p>Hi ${customerName},</p>
        <p>Thank you for connecting with us. We’ve successfully received your details.</p>
        <p>Our team will reach out to you shortly.</p>
        <p>Best Regards,<br>Your Company Team</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
