const express = require("express")
const app = require("../app.js")

const authRouter = require("./authRoutes.js")
const userRouter = require("./userRoutes.js")
const chatRouter = require("./chatRoutes.js")

const router = express.Router()

router.use('/auth',authRouter)
router.use('/user',userRouter)
router.use('/chat',chatRouter)
module.exports = router