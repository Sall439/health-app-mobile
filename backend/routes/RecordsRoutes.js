const express = require("express")
const router = express.Router()
const {addRecord, getPatientRecords} = require("../controllers/RecorsController")
const protect = require("../middlewares/authMiddlewares")
const authorizeRole = require("../middlewares/authorizeRole")

// Ajouter un dossier médical (docteur)
router.post("/", protect, authorizeRole("doctor"), addRecord)

// Voir dossiers d’un patient
router.get("/:patientId", protect, authorizeRole("doctor", "patient"), getPatientRecords)

module.exports = router
