import jwt from 'jsonwebtoken'
import constants from '../config/constants.js'

export default function(req, res, next){
    if(req.method === 'OPTIONS'){
        return next()
    }

    try{
        const token = req.headers?.authorization?.split(' ')[1]

        if(!token){
            return res.status(401).json({message: 'Not authorized'})
        }

        const decoded = jwt.verify(token, constants.secretKey)
        req.user = decoded
        next()
    }catch(e){
        return res.status(401).json({message: 'Token expired'})
    }
}