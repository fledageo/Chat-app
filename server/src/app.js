const express = require("express")
const http = require("http")
const WebSocket = require("ws")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const router = require("./routes/routes");
const Chat = require("./models/Chat")

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

        switch (data.type) {
            case "auth":
                const currentUser = data.payload
                ws.id = currentUser
                actives.set(currentUser, ws)
                sendActivesToUser(ws)
                sendUpdatedActives(ws.id)
                break

            case "send":
                const message = data.payload
                saveMessage(message)
                    .then(chat => {
                        ws.send(JSON.stringify({ type: "updateChat", payload: chat }))

                        if (actives.has(message.receiver)) {
                            const receiver = actives.get(message.receiver)
                            receiver.send(JSON.stringify({
                                type:"newMessage",
                                payload:{ 
                                    chat: chat, 
                                    message: chat.messages.at(-1) 
                                }
                            }))
                            // updateMessageStatus(chat._id , chat.messages.at(-1)._id).then(res => {
                            //     // receiver.send(JSON.stringify({ type: "updateChat", payload: chat }))
                            //     // receiver.send(JSON.stringify({type:"newMessage",payload:{sender:message.sender,content:message.content}}))
                            // })
                        }
                    })
                    .catch(error => console.log(error))
                break

            default:
                break

        }
    })

    ws.on("close", () => {
        actives.delete(ws.id);
        sendUpdatedActives(ws.id)
    });
})



const sendActivesToUser = (ws) => {
    ws.send(JSON.stringify({ type: "actives", payload: Array.from(actives).filter(elm => elm[0] !== ws.id) }))
}

const sendUpdatedActives = (currentUser) => {
    wss.clients.forEach(client => {
        if (client.id !== currentUser) {
            sendActivesToUser(client)
        }
    })
}


const updateMessageStatus = async (chatId, messageId) => {
    try {
        await Chat.updateOne(
            { _id: chatId, "messages._id": messageId }, // 
            { $set: { "messages.$.delivered": true } } //
        );

    } catch (error) {
        console.error(error);
    }
}

const saveMessage = async (messageData) => {
    try {
        const { sender, receiver, content } = messageData
        
        let chat = await Chat.findOne({ participants: { $all: [sender, receiver] } })
        if (!chat) {
            chat = new Chat({ participants: [sender, receiver], messages: [] })
        }
        chat.messages.push({
            sender: sender,
            content: content,
            receiver: receiver,
        })
        await chat.save();

        return chat
    } catch (error) {
        console.log(error)
    }
}



module.exports = server