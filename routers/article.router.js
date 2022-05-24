import { Router } from 'express'
import articleController from '../controllers/article.controller.js'
import auth from '../middleware/auth.middleware.js'

const router = new Router()

router.post('/', auth, articleController.add)
router.get('/', auth, articleController.list)
router.get('/preview', auth, articleController.previewList)
router.get('/:id', auth, articleController.getOne)

export default router