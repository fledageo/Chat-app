const Chat = require("../models/Chat")

class ChatController {
    

    async sendMessage(req, res) {

        try {
            const { sender, receiver, message } = req.body

            let chat = await Chat.findOne({ participants: { $all: [sender, receiver] } })
            if (!chat) {
                chat = new Chat({ participants: [sender, receiver], messages: [] })
            }
            chat.messages.push({
                sender: sender,
                content: message
            })
            await chat.save();

            res.send({ status: "ok", data: chat })
        } catch (error) {
            res.send({ status: "error", data: error })
        }

    }

    async getChat(req, res) {
        try {
            const { users } = req.query
            const chat = await Chat.findOne({ participants: { $all: users } })

            if (!chat) {
                res.send({ status: "error", message: "Chat not found" })
            } else {
                res.send({ status: "ok", data: chat })
            }
        } catch (error) {
            res.status(500).send(JSON.stringify(error))
        }
    }

    async getConversations(req,res){
        const {userId} = req.query
        console.log(userId)  //67583cb07c37e3626e7b9655
        try {
            const conversations = await Chat.find(
                {participants:userId},
                {participants:1,_id:0}
            )
            res.send({status:"ok",data:conversations})
        } catch (error) {
            res.send({status:"error",message:error})
        }
    }
}

module.exports = new ChatController()