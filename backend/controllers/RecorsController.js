const MedicalRecords = require("../models/MedicalRecords")

// Ajouter un dossier médical (doctor uniquement)
const addRecord = async (req, res) => {
    try {
        const { patientId, diagnostic, prescription, notes } = req.body

        const newRecord = await MedicalRecords.create({
            patientId,
            doctorId: req.user.id,
            diagnostic,
            prescription,
            notes
        })

        res.status(201).json(newRecord)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Voir dossiers d’un patient
const getPatientRecords = async (req, res) => {
    try {
        const { patientId } = req.params

        const records = await MedicalRecords.find({ patientId })
            .populate("doctorId", "name specialite")

        res.status(200).json(records)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    addRecord,
    getPatientRecords
}