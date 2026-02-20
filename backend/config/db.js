const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const db = async () => {
   try {
    await mongoose.connect(process.env.MONG_URL)
    .then(() => {
        console.log("Serveur demarre");
    })
   } catch (error) {
        console.log(error.message);
   }

} 
module.exports = db