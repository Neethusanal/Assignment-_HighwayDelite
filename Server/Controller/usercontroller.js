const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const UserModel=require("../Model/userModel")

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.ACCOUNT_NAME, 
      pass: process.env.ACC_PASS, 
    },
  });
  
  // Generate a random OTP
  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
console.log(generateOTP)

  module.exports.sendOtp=async(req,res)=>{
    const {name, email ,dob} = req.body;
    console.log(name,email ,dob)
  try {
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      existingUser.otp = otp;
      existingUser.otpExpiry = otpExpiry;
      await existingUser.save();
    } else {
      await UserModel.create({ email, otp, otpExpiry });
    }

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP for Signup',
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    });

    res.status(200).json({ success: true, message: 'OTP sent to email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error sending OTP.' });
  }
  }
module.exports.signUp=async(req,res)=>{
    
    const { name, dob, email, otp } = req.body;
    console.log(name,dob,email,otp)

  try {
    // Check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      // Generate and send OTP
      const generatedOTP = generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

      // Save user to database with OTP
      const newUser = new User({ name, dob, email, otp: generatedOTP, otpExpiry });
      await newUser.save();

      // Send OTP via email
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Your Signup OTP',
        text: `Your OTP is ${generatedOTP}. It is valid for 10 minutes.`,
      });

      return res.status(200).json({ success: true, message: 'OTP sent to email.' });
    }

    // Check OTP
    if (otp) {
      if (otp === existingUser.otp && new Date() < existingUser.otpExpiry) {
        // OTP verified
        existingUser.otp = null; // Clear OTP after verification
        existingUser.otpExpiry = null;
        await existingUser.save();
        return res.status(200).json({ success: true, message: 'Signup successful!' });
      }
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
    }

    res.status(400).json({ success: false, message: 'User already exists or invalid data.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}
     