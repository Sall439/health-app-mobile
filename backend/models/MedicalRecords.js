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
        default: date.now()

    }
}, {timestamps: true})

module.exports = mongoose.model("MedicalRecords", recordsSchema)