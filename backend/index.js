const express = require("express")
const cors = require("cors")
const db = require("./config/db")
const AuthRoutes = require("./routes/UserRoute")
const AppointmentRoutes =  require("./routes/AppointmentRoute")
const MessagesRoutes = require("./routes/MessagesRoutes")
const RecordRoutes = require("./routes/RecordsRoutes")

const app = express()
const router = express.Router()

app.use(express.json())
app.use(cors())

db()

app.use("/api/users", AuthRoutes)
app.use("/api/appointments", AppointmentRoutes)
app.use("/api/messages", MessagesRoutes)
app.use("/api/records", RecordRoutes)

router.get("/", (req, res) => {
   res.status(200).json({ status: "ok" })
})

app.listen(process.env.PORT,() => {
    console.log("Serveur demarrer");
    
})