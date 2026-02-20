const mongoose = require("mongoose")

const messagesSchema = mongoose.Schema({
    senderId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiverId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    message : {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Messages", messagesSchema)