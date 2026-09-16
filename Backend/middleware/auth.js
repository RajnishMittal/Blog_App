const { getUser } = require("../services/auth")

function restrictToLoggedIn(req, res, next) {
    const token = req.cookies.uid
    if (!token) {
        res.setHeader("Cache-Control", "no-store")
        return res.status(401).json({ message: "Not authenticated" })
    }
    
    try {
        const user = getUser(token)
        req.user = user
        res.setHeader("Cache-Control", "no-store")
        next()
    } catch (err) {
        return res.status(401).json({ message: "Not authenticated" })
    }
}

module.exports = {
    restrictToLoggedIn
}