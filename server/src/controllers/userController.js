const User = require("../models/User")

class UserController {
    async getUserByUsername(req,res){
        const username = req.params.username

        const user = await User.findOne({username})

        res.send({status:"ok",data:user})
    }

    async getAllUsernames(req,res){
        const usernames = await User.find({},{username:1})
        res.send({status:"ok",data:usernames})
    }
}

module.exports = new UserController()