const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
        user: "apikey", 
        pass: process.env.SENDGRID_API_KEY
    }
})

const sendEmail = async (to, subject, text) => {
    try {

        const info = await transporter.sendMail({
            from: `"CareFlow" <no-reply@careflow.com>`,
            to,
            subject,
            text
        })

        console.log("Email envoyé :", info.response)

    } catch (error) {
        console.error("Erreur email :", error)
    }
}


module.exports = sendEmail