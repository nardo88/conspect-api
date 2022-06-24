import { Router } from 'express'
import userControllers from '../controllers/user.controllers.js'
import { check } from "express-validator";
import auth from '../middleware/auth.middleware.js'

const router = new Router()

router.post('/signup', [
    check('email', 'Unicorrect email').isEmail(),
    check('password', 'Password must be longer than 3 and shorted then 12').isLength({min:3, max:12}),
], userControllers.signUp)

router.post('/signin', [
    check('email', 'Unicorrect email').isEmail(),
], userControllers.signIn)

router.get('/session', auth, userControllers.session )
router.get('/', auth, userControllers.list )

router.put('/:id', auth, userControllers.update )


export default router