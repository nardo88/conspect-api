import { Router } from 'express'
import fileControllers from '../controllers/file.conroller.js'

const router = new Router()

router.post('/add', fileControllers.uploadFile)

export default router