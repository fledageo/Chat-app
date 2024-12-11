const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router()

router.get("/:username",userController.getUserByUsername)


module.exports = router