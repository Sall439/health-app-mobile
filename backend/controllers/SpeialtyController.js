
const Specialty = require("../models/Specialty")
const Users = require("../models/Users")


const getSpecialty = async (req, res) => {
    try {
        const specialite = await Specialty.find()

        res.status(200).json(specialite)
    } catch (error) {
         res.status(500).json({message: error.message})
    }
}

const getDoctorsSpecialty = async(req, res) => {
    try {
        const {id} = req.params

        const doctorSpecialty= await Users.find({specialty: id, role: "doctor"})
        .populate("hospital")
        .populate("specialite")

        res.status(200).json(doctorSpecialty)
    } catch (error) {
         res.status(500).json({message: error.message})
    }
}

module.exports = {getDoctorsSpecialty, getSpecialty}