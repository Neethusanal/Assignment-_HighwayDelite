const express=require("express")
const mongoose= require("mongoose")
const cors= require("cors")
// const PORT =process.env.PORT||4000
const dotenv=require("dotenv")
const http= require('http')
const app=express();
const userRoutes = require('./Routes/userRoutes');
const dbConnection=require('./config/dbconfig')
dbConnection()

mongoose.connect(process.env.DB_URL, {
    
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
  app.use(express.json());
  app.use(cors({
    origin: [process.env.BASE_URL],
    method: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  }));
  app.listen(process.env.PORT,()=>{
    console.log(`Server started at port ${process.env.PORT}`)
})
  
  app.use('/', userRoutes);