const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const JWT_SECRET = "my-secret-key"

class AuthController {
    async handleSignUp(req, res) {
        try {
            const { username, password } = req.body

            const isExist = await User.findOne({ username })

            if (isExist) {
                return res.send({ status: 'error', message: "User already exists" })
            }
            const hashed = bcrypt.hashSync(password, 8)
            const user = new User({ username, password: hashed })


            await user.save()

            res.send({ status: "ok", message: "Account has been successfully created" })

        } catch (error) {
            res.send({ status: 'error', message: "Internal server error" })
        }
    }

    async handleLogin(req, res) {
        try {
            const { username, password } = req.body
            const foundUser = await User.findOne({ username })

            if (!foundUser) {
                return res.send({ status: "error", message: "Wrong user credentials: Username" })
            }
            const checkedPass = await bcrypt.compareSync(password, foundUser.password)
            if (!checkedPass) {
                return res.send({ status: "error", message: "Wrong user credentials: Password" })
            }

            const token = jwt.sign({ id: foundUser.id }, JWT_SECRET, { expiresIn: "60m" })
            res.cookie('token', token, {
                maxAge: 60 * 60 * 1000,
            });

            res.send({status:"ok"})
        } catch (error) {
            res.send({status:"error",message:"Internal server error"})
        }
    }

    async verifyAuth(req,res) {
        const token = req.cookies.token
        if(!token){
            return res.send({status:"error",message:"No token. Access denied!"})
        }
        
        try {   
            jwt.verify(token,JWT_SECRET)
            res.send({status:"ok",message:"Access allowed"})

        } catch (error) {
            res.clearCookie("token")
            res.send({status:"error",message:"No token. Access denied!"})
        }
    }

}

module.exports = new AuthController()