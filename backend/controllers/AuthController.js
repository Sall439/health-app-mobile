const Users = require("../models/Users")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")


const loginUsers = async (req, res) => {
   try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({message: "Veuillez remplir ses champs"})
        }

        const existingUser = await Users.findOne({email})
        if(!existingUser){
            return res.status(400).json({ message: "Utilisateur non trouve" })
        }

        const comparePassword = await bcryptjs.compare(password, existingUser.password)

        if(!comparePassword){
            return res.status(400).json({message: "Mot de passe incorrect"})
        }

        const token = jwt.sign({id: existingUser._id, role: existingUser.role}, process.env.JWT_SECRET, {expiresIn: "24h"})

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({message: "Utilisateur connecte", token})

   } catch (error) {
        return res.status(500).json({message: error.message})
   }
}


const registerUsers = async (req, res) => {
     try {
        const {name, email, password, tel, role, specialite} = req.body

        if(!name || !email || !password || !tel || !role){
            return res.status(400).json({message: "Veuillez remplir ses champs"})
        }

        // ON verifie si en tant que docteur le champ specialite est renseigne
         if(role === "doctor" && !specialite){
            return res.status(400).json({message: "La spécialité est obligatoire pour un docteur"})
        }

         const existingUser = await Users.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email déjà utilisé" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const userData = {
            name,
            email, 
            password: hashedPassword,
            tel,
            role,
            specialite
        }


        // On dis que si le role === doctor donc on rempli le champ spacialite sinon ya pas lieu d'etre
        if (role === "doctor") {
            userData.specialite = specialite
        }

        const newUser = await Users.create(userData)            

        const token = jwt.sign({
            id: newUser._id,
            role: newUser.role
        }, process.env.JWT_SECRET,
        {
            expiresIn: "24h"
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            token, //pour tester en local, en prod on le supprimer 
            newUser: {
                id: newUser._id,
                email: newUser.email,
                tel: newUser.tel,
                role: newUser.role
            }
        })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const logoutUsers = async (req, res) => {
     res.clearCookie("token")
     return res.status(200).json({message: "Deconnexion reussie"})
}


   const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Champs requis manquants" })
        }

        const user = await Users.findById(req.user.id)
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" })
        }

        const isMatch = await bcryptjs.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Ancien mot de passe incorrect" })
        }

        const hashedPassword = await bcryptjs.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save()

        res.status(200).json({ message: "Mot de passe modifié avec succès" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}




module.exports = {
    loginUsers,
    registerUsers,
    logoutUsers,
    changePassword
}