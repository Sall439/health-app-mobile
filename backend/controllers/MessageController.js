const Messages = require("../models/Messages")

// Envoyer message
const sendMessage = async (req, res) => {
    try {
        const { receiverId, message } = req.body

        if (!receiverId || !message) {
            return res.status(400).json({ message: "Champs requis manquants" })
        }

        const newMessage = await Messages.create({
            senderId: req.user.id,
            receiverId,
            message
        })

        res.status(201).json(newMessage)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Voir conversation entre 2 users
const getConversation = async (req, res) => {
    try {
        const { userId } = req.params

        const messages = await Messages.find({
            $or: [
                { senderId: req.user.id, receiverId: userId },
                { senderId: userId, receiverId: req.user.id }
            ]
        }).sort({ createdAt: 1 })

        res.status(200).json(messages)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    sendMessage,
    getConversation
}