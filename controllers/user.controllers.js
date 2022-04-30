import User from "../models/user.js"

class userController {
    async signUp(req, res){
        const {email, password} = req.body
        const user = new User({email, password})
        await user.save()
        res.json({message: 'works'})
    }
}

export default new userController()