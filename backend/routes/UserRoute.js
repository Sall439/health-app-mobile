const express = require("express")

const router = express.Router()

const {registerUsers, loginUsers, logoutUsers, changePassword} = require("../controllers/AuthController")
const {getAllAppointment, getProfile, getAlldoctors, reportAppointment, createAppointment} = require("../controllers/PatientController")
const { getPatients , getPatientId, addPatient,} = require("../controllers/DocteurController")
const protect = require("../middlewares/authMiddlewares")
const authorizeRole = require("../middlewares/authorizeRole")


// Auth Routes
router.post("/login", loginUsers)
router.post("/register", registerUsers)
router.post("/logout", logoutUsers)
router.post("/change-password", protect, changePassword)

// Patient Routes
router.get("/patient/profile",protect,authorizeRole("patient"), getProfile)
router.get("/patient/doctors",protect, authorizeRole("patient"), getAlldoctors)
router.get("/patient/appointments",protect, authorizeRole("patient"), getAllAppointment)
router.post("/patient/newAppointment",protect, authorizeRole("patient"), createAppointment)
router.put("/patient/appointments/:id",protect, authorizeRole("patient"), reportAppointment)


// Doctors routes
router.get("/doctors/patients", protect, authorizeRole("doctor"), getPatients)
router.get("/doctors/patients/:id", protect, authorizeRole("doctor"), getPatientId)
router.post("/doctors/newPatient", protect, authorizeRole("doctor"), addPatient)

module.exports = router