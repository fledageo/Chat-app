const User = require("../models/User")

class UserController {
    async getUserByUsername(req,res){
        const username = req.params.username

        const user = await User.findOne({username})

        res.send({status:"ok",data:user})
    }
}

module.exports = new UserController()