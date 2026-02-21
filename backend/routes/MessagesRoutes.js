const express = require("express")
const router = express.Router()
const {sendMessage, getConversation} = require("../controllers/MessageController")
const protect = require("../middlewares/authMiddlewares")

// Envoyer message
router.post("/", protect, sendMessage)

// Voir conversation avec un autre utilisateur
router.get("/:userId", protect, getConversation)

module.exports = router