const Users = require("../models/Users")
const bcryptjs = require("bcryptjs")




const addPatient = async (req, res) => {
   try {
    const {name, email, tel, password} = req.body

    if(!name || !tel || !email || !password){
        return res.status(400).json({message: "veuillez remplir ses champs"})
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const newUser = await Users.create({
        name,
        email,
        tel,
        role: "patient",
        password: hashedPassword
    })

    await newUser.save()

    res.status(201).json(newUser)
   } catch (error) {
     res.status(500).json({ message: error.message })
   }

}

const getPatients = async (req, res) => {
     try {
        const users = await Users.find({role: "patient"}).select("-password")

          if (users.length === 0) {
            return res.status(404).json({ message: "Aucun patient trouvé" })
        }

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getPatientId = async (req, res) => {
    try {

        const {id} = req.params
        const userId = await Users.findById(id).select("-password")

        if(!userId){
            return res.status(400).json({message: "Aucun Patient trouve"})
        }

         res.status(200).json(userId)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}




module.exports = {
    addPatient,
    getPatients,
    getPatientId,
}