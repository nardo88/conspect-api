import { Router } from 'express'
import userControllers from '../controllers/user.controllers.js'

const router = new Router()

router.post('/signin', userControllers.signUp)

export default router