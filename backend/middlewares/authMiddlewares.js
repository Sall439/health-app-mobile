const jwt = require("jsonwebtoken")


const protect = async (req, res) => {
    try {
       // 1️⃣ Vérifier token dans le cookie
        let token = req.cookies?.token

        // 2️⃣ Si pas dans cookie, vérifier header Authorization
        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
        }
        
        if(!token){
            return res.status(401).json({messages : "Non autorise, token manquant"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()

    } catch (error) {
         return res.status(401).json({ message: "Token invalide" })
    }
}

module.exports = protect