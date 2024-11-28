const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const UserModel=require("../Model/userModel")



require('dotenv').config();
const formData = require('form-data');
const Mailgun = require('mailgun.js');


const API_KEY = process.env.MAILGUN_API_KEY; // Your private Mailgun API key
const DOMAIN = process.env.MAILGUN_DOMAIN; // Your Mailgun domain (e.g., sandbox domain or custom domain)
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY ||API_KEY});

// Function to generate OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit OTP
}

// Function to send OTP
module.exports.sendOtp = async (req, res) => {
    const { name, email, dob } = req.body;
    console.log(`Name: ${name}, Email: ${email}, DOB: ${dob}`);

    const otp = generateOtp(); // Generate a 6-digit OTP

    const messageData = {
      from: "Excited User <mailgun@sandbox-123.mailgun.org>",  // Replace with your Mailgun 'from' address
      to: email,  // The recipient email from the request
      subject: "Your OTP Code",  // Subject of the email
      text: `Hello ${name},\nYour OTP code is: ${otp}`,  // OTP in text format
      html: `<h1>Hello ${name},</h1><p>Your OTP code is: <strong>${otp}</strong></p>`  // OTP in HTML format
    };
    
  try {
      const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, messageData);
      console.log('Email sent:', result);
      res.status(200).json({ success: true, otp });
  } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

  
module.exports.signUp=async(req,res)=>{
    
   
}
     