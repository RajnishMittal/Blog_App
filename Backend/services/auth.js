const jwt = require("jsonwebtoken")
const secret = "1qwer@23"

function setUser(user){
    return jwt.sign({
        email:user.email,
        _id:user._id
    }, secret)
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token, secret)
}

module.exports = {
    setUser,
    getUser
}