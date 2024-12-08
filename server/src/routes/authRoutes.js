const express = require("express")
const AuthController = require("../controllers/authController.js")
const router = express.Router()

router.post("/registration", AuthController.handleSignUp)
router.post("/login", AuthController.handleLogin)
router.get("/verify",AuthController.verifyAuth)
module.exports = router