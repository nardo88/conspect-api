import {
    validationResult
} from "express-validator"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import constants from "../config/constants.js"
import User from "../models/user.js"
import {
    createId
} from "../utils/createId.js"

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
            const {
                email,
                password
            } = req.body

            const candidate = await User.findOne({
                email
            })

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

            res.json({
                message: 'User was created'
            })

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
                expiresIn: '27d'
            })
            return res.json({
                token,
                id: user._id,
                roles: user.roles
            })
        } catch (e) {
            console.log(e)
            res.json({
                message: 'Server error',
                error: e
            })
        }
    }

    async session(req, res) {
        try {
            const user = await User.findById(req.user.id)

            res.json({
                email: user.email,
                roles: user.roles,
                id: user._id
            })

        } catch (e) {
            console.log(e)
            res.json({
                message: 'Server error',
                error: e
            })
        }
    }

    async list(req, res) {
        try {
            const {
                page = 1, limit = 10, category = '', title = ''
            } = req.query

            const users = await User.aggregate([
                {
                    $match: {
                        _id: {$ne: req.user.id}
                    }
                },
                {
                    $sort: {
                        updatedAt: -1
                    },
                },

                {
                    $facet: {
                        data: [{
                                $skip: (page - 1) * Number(limit)
                            },
                            {
                                $limit: Number(limit)
                            },
                            {
                                $project: {
                                    id: '$_id',
                                    _id: 0,
                                    email: 1,
                                    roles: 1,
                                    createdAt: 1,
                                    updatedAt: 1,
                                }
                            }
                        ],
                        total: [{
                            $count: 'count'
                        }]
                    }
                },
                {
                    $project: {
                        data: 1,
                        total: {
                            $arrayElemAt: ['$total.count', 0]
                        }
                    }
                }
            ])
            res.json({
                data: users[0].data,
                total: users[0].total || 0
            })

        } catch (e) {
            console.log(e)
            res.json({
                message: 'Server error',
                error: e
            })
        }
    }

    async update(req, res){
        try {
            const id = req.params.id
            const data = req.body

            await User.findByIdAndUpdate(id, {
                ...data
            })
            res.json('success')

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