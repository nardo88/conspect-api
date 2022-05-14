import { Router } from 'express'
import userControllers from '../controllers/user.controllers.js'
import { check } from "express-validator";

const router = new Router()

router.post('/signup', [
    check('email', 'Unicorrect email').isEmail(),
    check('password', 'Password must be longer than 3 and shorted then 12').isLength({min:3, max:12}),
], userControllers.signUp)

router.post('/signin', [
    check('email', 'Unicorrect email').isEmail(),
], userControllers.signIn)

export default router