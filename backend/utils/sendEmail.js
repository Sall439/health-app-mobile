const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
  try {
    await sgMail.send({
      to,
      from: "no-reply@careflow.com", // expéditeur unique
      subject,
      text,
    });
    console.log("Email envoyé à", to);
  } catch (error) {
    console.error("Erreur email :", error);
  }
};

module.exports = sendEmail;