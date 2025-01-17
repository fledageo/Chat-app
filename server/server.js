const Mongoose = require("mongoose")
const server = require("./src/app.js")

const PORT = process.env.PORT | 5000

const start = async() => {
    try {
        await Mongoose.connect(`mongodb+srv://fledage:fledage123@chat-cluster.imkdt.mongodb.net/?retryWrites=true&w=majority&appName=chat-cluster`)
        server.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()