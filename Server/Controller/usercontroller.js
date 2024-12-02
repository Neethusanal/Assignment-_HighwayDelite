const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const UserModel=require("../Model/userModel")



require('dotenv').config();
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit OTP
}

module.exports.sendOtp = async (req, res) => {
  const { name, email, dob } = req.body;
  console.log(`Name: ${name}, Email: ${email}, DOB: ${dob}`);

  const otp = generateOtp(); // Generate a 6-digit OTP

  try {
    const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Highway Delite <${process.env.ACCOUNT_NAME}>`, // Valid sender email
      to: email, // Recipient email from request body
      subject: "Your OTP Code",
      text: `Hello ${name}, your OTP code is: ${otp}.`,
      html: `<p>Hello <strong>${name}</strong>, your OTP code is: <strong>${otp}</strong>.</p>`,
    });

    console.log('Email sent:', msg);
    res.status(200).json({ success: true, message: 'OTP sent successfully', otp });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ success: false, message: 'Error sending OTP', error: err.message });
  }
};
  
module.exports.signUp=async(req,res)=>{
    
   
}
     