const Chat = require("../models/Chat")

class ChatController {
    // async createChat(req, res) {
    //     try {
    //         const { users, message } = req.body

    //         const chat = new Chat({
    //             participants: users,
    //             messages: [message]
    //         })
    //         chat.save()
    //         res.send({ status: "ok", data: chat })
    //     } catch (error) {
    //         res.send({ status: "error", message:"Something went wrong" })
    //     }
    // }

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
        const { users } = req.query
        const chat = await Chat.findOne({ participants: { $all: users } })
        
        if (!chat) {
            res.send({ status: "error", message: "Chat not found" })
        } else {
            res.send({ status: "ok", data: chat })
        }
    }

}

module.exports = new ChatController()