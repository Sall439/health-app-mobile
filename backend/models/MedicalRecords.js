const mongoose = require("mongoose")


const recordsSchema = mongoose.Schema({

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Users",
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Users",
        required: true
    },

    specialiteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    },
    
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    },

    diagnostic: {
        type: String,
        required: true
    },
    prescription: {
        type: String,
        required: true
    },

    notes: {
        type: String,
       required: true
    },

    date: {
        type: Date,
    }
}, {timestamps: true})

module.exports = mongoose.model("MedicalRecords", recordsSchema)