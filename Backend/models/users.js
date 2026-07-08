const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    pass:{
        required:true,
        type:String
    }
}, {timestamps:true})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel