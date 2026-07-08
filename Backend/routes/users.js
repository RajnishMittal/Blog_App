const express = require("express")
const { signUpUser, logInUser, getCurrentUser, LogOutUser } = require("../controllers/userAuth")
const { restrictToLoggedIn } = require("../middleware/auth")
const router = express.Router()

router.post("/", signUpUser)
router.get("/me", restrictToLoggedIn, getCurrentUser)
router.post("/login", logInUser)
router.post("/logout", LogOutUser)

module.exports = router