const Hospital = require("../models/Hospital")


const createHospital = async (req, res) => {
    try {
        const {name, desc, image, adress, specialties }= req.body

        if(!name || !adress || !specialties || !desc || !image){
            return res.status(400).json({message: "Veuillez remplir ses champs"})
        }

        const newHospital = await Hospital.create({
            name, desc, image, adress, specialties
        })

        await newHospital.save()

        res.status(201).json({message: "hopital ajoute avec succes", newHospital})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getAllHospital = async (req, res) => {
    try {
        const hospital = await Hospital.find().populate("specialties")

        if(hospital.length === 0){
            return res.status(400).json({message: "Aucun hopital trouve"})
        }

        res.status(200).json(hospital)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getAllSpecialtyHospital = async (req, res) => {
    try {
        const {id} = req.params

        const hospital = await Hospital.findById(id).populate("specialties")

        if(!hospital){
            return res.status(400).json({message: "Aucun hopital trouve"})
        }

        res.status(200).json(hospital.specialties)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getOneHospital = async(req, res) => {
    try {
        const {id} = req.params

        const hospital = await Hospital.findById(id).populate("specialties")

          if(!hospital){
            return res.status(400).json({message: "Aucun hopital trouve"})
        }

        res.status(200).json(hospital)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports ={
    createHospital,
    getAllHospital,
    getAllSpecialtyHospital,
    getOneHospital
}