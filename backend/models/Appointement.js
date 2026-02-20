const mongoose = require("mongoose")

const appointSchema = mongoose.Schema({
   
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

    date: {
        type: Date,
        required: true
    },
    heure: {
        type: Date,
        required: true
    },

    statut: {
        type: String,
        enum: ["en attente", "acheve", "en cours", "reporte"],
        default: "en attente"
    },

    motif: {
        type: String,
        required: true
    }
}, {timestamps: true})



module.exports = mongoose.model("Appointment", appointSchema)