const authorizeRole = (...role) => {
    return (req, res, next) => {
        if(!removeEventListener.includes(req.user.role)){
            return res.status(403).json({message: "Acces refuse"})
        }
    }
}