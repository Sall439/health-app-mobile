const express = require("express")
const router = express.Router()
const { getAppointments } = require("../controllers/AppointmentController")
const protect = require("../middlewares/authMiddlewares")
const authorizeRole = require("../middlewares/authorizeRole")

// Voir tous les rendez-vous (admin / doctor)
router.get("/allRV", protect, authorizeRole("doctor", "admin"), getAppointments)

module.exports = router