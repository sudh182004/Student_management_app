const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        required:true,
        min:18,
        max:40,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true,
    },
    phone:{
        type:String,
        required:true,

    },
    qualification:{
        type:String,
        enum: ['High School', 'Diploma', 'Graduate', 'Post Graduate', 'PhD', 'Other'],
        default:"Other",
    },
   } ,{timestamps:true})

module.exports = mongoose.model("Student",studentSchema);