import User from "../models/user.js"

class userController {
    async signUp(req, res){
        const {email, password} = req.body
        const candidate = await User.find({email: email})
        if(candidate){
            return res.status(400).json({message: 'Email already exists'})
        }
        
        const user = new User({email, password})
        await user.save()
        res.json({message: 'works'})
    }
}

export default new userController()