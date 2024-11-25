const mongoose=require('mongoose')
require("dotenv").config();
const dbConnection=async()=>{
    mongoose.set("strictQuery",false)
    try{
        mongoose.connect(process.env.DB_URL,
            {useNewUrlParser: true,
             useUnifiedTopology: true
            }
            ).then(()=>{
                console.log("Data base connected")
            }).catch((err)=>{
                console.log("error",err.message)
            })
        }catch(error){
            console.log("DatabaseError",error)
        }
    }
    module.exports=dbConnection