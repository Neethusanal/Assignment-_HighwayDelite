const mongoose=require("mongoose")
const userSchema= new mongoose.Schema({
    email:{
        type :String,
        required:true,
        unique:true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex to validate email format
    },
    dob: {
        type: Date, 
        
      },
    // password:{
    //     type:String,
    //     required:true,
    //     minlength:6
    // }, 
    name:{
        type:String,
        

    },
    otp:{
        type:String,
        default:null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    
    isVerified:{
        type:Boolean,
        default:false,
    },
},{timestamps:true})
const UserModel = mongoose.model("User",userSchema )
module.exports = UserModel