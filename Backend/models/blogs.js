const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    image:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    textContent:{
        required:true,
        type:String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users"
    }
}, {timestamps:true})

const blogModel = mongoose.model("blogs", blogSchema)

module.exports = blogModel