const userModel = require("../models/users")
const { setUser } = require("../services/auth")

async function signUpUser(req, res) {
    const body = req.body
    console.log(body)
    if (!body) return res.json({ error: "no data" })
    const result = await userModel.create({
        name: body.name,
        email: body.email,
        pass: body.pass
    })
    return res.status(201).json({
        message: "User created successfully"
    });
}

async function logInUser(req, res) {
    const body = req.body
    if (!body) return res.json({ error: "no data" })

    try {
        const result = await userModel.findOne({ email: body.email, pass: body.pass })
        if (!result) {
            return res.status(401).json({ error: "user not found" }) 
        }

        const token = setUser(result)
        res.cookie("uid", token)

        return res.status(200).json({
            message: "User signed in successfully",
            user: {
                _id: result._id,
                name: result.name,
                email: result.email
            }
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: "Something went wrong" })
    }
}

async function getCurrentUser(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" })
        }

        const user = await userModel.findById(req.user._id).select("-pass")
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        return res.status(200).json({
            user
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: "Something went wrong" })
    }
}

function LogOutUser(req, res) {
    res.clearCookie("uid")
    res.status(200).json({ status: "Log out successfully" })
}

module.exports = {
    signUpUser,
    logInUser,
    getCurrentUser,
    LogOutUser
}