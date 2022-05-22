import { Router } from 'express'
import articleController from '../controllers/article.controller.js'
import auth from '../middleware/auth.middleware.js'

const router = new Router()

router.post('/', auth, articleController.add)
router.get('/:id', auth, articleController.getOne)
router.get('/', auth, articleController.list)

export default router