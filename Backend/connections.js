const mongoose = require("mongoose")

function createConnection(){
    return mongoose.connect("mongodb://localhost:27017/blog_app")
}

module.exports = {createConnection}