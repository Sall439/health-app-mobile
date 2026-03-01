const mongoose = require("mongoose")

const hospitalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    adress: {
        type: String,
        required: true
    },

    image: { 
        type: String 
    },

    specialties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specialty"
    }]
}, {timestamps: true})

module.exports = mongoose.model("Hospital", hospitalSchema)