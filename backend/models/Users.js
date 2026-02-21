const mongoose = require("mongoose")
const { v4: uuidv4 } = require("uuid")

const userSchema = mongoose.Schema({
    id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["patient", "doctor", "admin"],
        default: "patient"
    },
    specialite: {
        type: String,
        required: function () {
            return this.role === "doctor"
        }
    },
    tel: {
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("Users", userSchema)