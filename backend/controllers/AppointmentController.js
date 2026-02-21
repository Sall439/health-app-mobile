const Appointment = require("../models/Appointement")

// Voir tous les rendez-vous (admin ou doctor)
const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("patientId", "name email tel")
            .populate("doctorId", "name specialite tel")

        res.status(200).json(appointments)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAppointments
}