const express=require("express")
const mongoose= require("mongoose")
const cors= require("cors")
const port =process.env.PORT||4000
const dotenv=require("dotenv")
const http= require('http')
const userRoutes = require('./Routes');

mongoose.connect(process.env.DATABASE_URL, {
    
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
  app.use(express.json());
  app.use(cors({
    origin: [process.env.BASE_URL],
    method: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  }));
  
  app.use('/', userRoutes);