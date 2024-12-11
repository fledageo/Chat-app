const express = require("express")
const http = require("http")
const WebSocket = require("ws")
const { v4: uuidv4 } = require('uuid');
const cors = require("cors")
const cookieParser = require("cookie-parser")

const router = require("./routes/routes")
const app = express()

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use('/api', router)



//WebSocket
const actives = new Map()

wss.on("connection", (ws) => {

    
    ws.on('message', (message) => {
        const data = JSON.parse(message)
        const currentUser = data.payload

        if(data.type == "auth"){
            ws.username = currentUser
            actives.set(currentUser,ws)
            sendActivesToUser(ws)
            
            sendUpdatedActives(ws.username)
        }
    })

    ws.on("close", () => {
        actives.delete(ws.userId);
    });
})

const sendActivesToUser = (ws) => {
    ws.send(JSON.stringify(Array.from(actives).filter(elm => elm[0] !== ws.username)))
}

const sendUpdatedActives = (currentUser) => {
    wss.clients.forEach(client => {
        if(client.username !== currentUser){
            sendActivesToUser(client) 
        }
    })
}




module.exports = server