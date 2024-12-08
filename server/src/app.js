const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const router = require("./routes/routes")
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use('/api', router)



module.exports = app