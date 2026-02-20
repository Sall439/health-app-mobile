const express = require("express")
const cors = require("cors")
const db = require("./config/db")


const app = express()

app.use(express.json())
app.use(cors())

db()

app.get("/", (req, res) => {
    res.send("PAges deploye")
})

app.listen(process.env.PORT,() => {
    console.log("Serveur demarrer");
    
})