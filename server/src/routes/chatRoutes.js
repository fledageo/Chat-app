const express = require("express")
const ChatController = require("../controllers/chatController.js")
const router = express.Router()

router.get("/", ChatController.getChat)
// router.post("/login", AuthController.handleLogin)
// router.get("/verify",AuthController.verifyAuth)
module.exports = router