const express = require("express")
const app = require("../app.js")

const authRouter = require("./authRoutes.js")

const router = express.Router()

router.use('/auth',authRouter)

module.exports = router