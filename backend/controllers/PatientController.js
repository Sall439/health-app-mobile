
const Appointement = require("../models/Appointement")
const Users = require("../models/Users")


const getAlldoctors = async (req, res) => {
    try {
       const docteurs = await Users.find({ role: "doctor"}).select("-password")
       res.status(200).json(docteurs)
    } catch (error) {
         res.status(500).json({ message: error.message })
    }
}

const createAppointment = async (req, res) => {
    try {
       const { doctorId, hospitalId, specialtyId, motif, date, heure } = req.body;

        const doctor = await Users.findById(doctorId);
        if(!doctor || doctor.role !== "doctor") return res.status(400).json({msg:"Médecin invalide"});
        if(doctor.hospital.toString() !== hospitalId) return res.status(400).json({msg:"Médecin non disponible dans cet hôpital"});
        if(doctor.specialty.toString() !== specialtyId) return res.status(400).json({msg:"Médecin non disponible pour cette spécialité"});
        
        const newAppointment = await Appointement.create({
            patientId: req.user.id,
            doctorId,
            motif,
            date,
            heure
        })

        console.log(req.user);
        

        await newAppointment.save()

        res.status(201).json({
            message: "Rendez-vous enregistre avec succes",
            newAppointment
        })
    } catch (error) {
         res.status(500).json({ message: error.message })
    }
}

const getAllAppointment = async (req, res) => {
    try {
        const appointment = await Appointement.find({patientId: req.user.id}).populate("doctorId", "name tel specialite email")
        res.status(200).json(appointment)
    } catch (error) {
         res.status(500).json({ message: error.message })
    }
}

const reportAppointment = async (req, res) => {
    try {
        const {id} = req.params
        const {date, heure} = req.body

        const appointment = await Appointement.findById(id)

        if(!appointment){
            return res.status(400).json({message: "Rendez-vous introuvable"})
        }

        appointment.date = date
        appointment.heure = heure
        appointment.statut = "reporte"

        await appointment.save()

        res.status(200).json({message: "Rendez-vous reporte avec succes"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const getProfile = async(req, res) => {
    try {
        const user = await Users.findById(req.user.id).select("-password")
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllAppointment,
    getAlldoctors,
    reportAppointment,
    getProfile,
    createAppointment
}