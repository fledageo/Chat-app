const express = require("express")
const ChatController = require("../controllers/chatController.js")
const router = express.Router()

router.get("/", ChatController.getChat)
router.post("/send",ChatController.sendMessage)
module.exports = router