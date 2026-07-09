const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    text: {
        required: true,
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    commentOn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogs"
    },
    time: {
        type: Date
    }
}, { timestamps: true })

const chatModel = mongoose.model("chats", chatSchema)

module.exports = chatModel