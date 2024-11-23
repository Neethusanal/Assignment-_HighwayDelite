const mongoose=require("mongoose")
const notesSchema= new mongoose.Schema({

    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:User
    },
    title:{
        type:String,
        required:true,

    },
    content:{
        type:String,
        required:true,

    }
    
},{timestamps:true})
const NotesModel = mongoose.model("Note", notesSchema);
module.exports =  NotesModel