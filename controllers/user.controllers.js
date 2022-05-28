import {validationResult} from "express-validator"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import constants from "../config/constants.js"
import User from "../models/user.js"
import { createId } from "../utils/createId.js"

class userController {
    async signUp(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'incorrect data',
                    errors
                })
            }
            const {email,password} = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.json({
                    message: `User with email: ${email} alredy exist`
                })
            }

            const hashPassword = await bcrypt.hash(password, 7)
            const user = new User({
                _id: createId(),
                email,
                password: hashPassword
            })
            await user.save()

            res.json({message: 'User was created'})

        } catch (e) {
            console.log(e)
            res.json({
                message: 'Server error',
                error: e
            })
        }
    }

    async signIn(req, res) {
        try {
            const {
                email,
                password
            } = req.body
            const user = await User.findOne({
                email
            })
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({
                    message: 'invalid password'
                })
            }
            const token = jwt.sign({
                id: user.id
            }, constants.secretKey, {
                expiresIn: '24h'
            })
            return res.json({
                token,
                id: user._id,
            })
        } catch (e) {
            console.log(e)
            res.json({
                message: 'Server error',
                error: e
            })
        }
    }


}

export default new userController()