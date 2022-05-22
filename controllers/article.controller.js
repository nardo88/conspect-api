import {
    createId
} from "../utils/createId.js"
import Article from '../models/article.js'

class articleController {
    async add(req, res) {
        try {
            const {
                category,
                title,
                userId,
                body
            } = req.body

            const newArticle = new Article({
                _id: createId(),
                category,
                title,
                userId,
                body
            })

            await newArticle.save()
            res.json({
                message: 'Article was created'
            })
        } catch (e) {
            console.log(e)
            res.json({
                message: 'Server error',
                error: e
            })
        }
    }

    async getOne(req, res){
        try{
            const {id} = req.params

            if(!id){
                return res.status(400).json('id not specified')
            }

            const article = await Article.findById(id)
            res.json(article)

        } catch (e) {
            console.log(e)
            res.json({
                message: 'Server error',
                error: e
            })
        }
    }

}

export default new articleController()