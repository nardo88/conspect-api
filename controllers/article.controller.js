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

    async list(req, res) {
        try {
            const {
                page = 1, limit = 10, category = ''
            } = req.query

            const articles = await Article.aggregate([{
                    $match: {
                        category:  { $regex: category, $options: 'i' }
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
                                    title: 1,
                                    category: 1,
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
                data: articles[0].data,
                total: articles[0].total
            })

        } catch (e) {
            console.log(e)
            res.json({
                message: 'Server error',
                error: e
            })
        }

    }

    async previewList(req, res) {
        try {

            const articles = await Article.aggregate([
                {
                    $project: {
                        id: '$_id',
                        _id: 0,
                        title: 1,
                        category: 1
                    }
                },
                {
                    $group: {
                        _id: '$category',
                        titles: {
                            $push: {
                                title: '$title',
                                id: '$id'
                            }
                        }
                    }
                },
                {
                    $sort: {
                        _id: 1
                    }
                }
            ])

            res.json(articles)

        } catch (e) {
            console.log(e)
            res.json({
                message: 'Server error',
                error: e
            })
        }

    }

    async getOne(req, res) {
        try {
            const {
                id
            } = req.params

            if (!id) {
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

    async delete(req, res) {
        try {
            const {
                id
            } = req.params

            if (!id) {
                return res.status(400).json('id not specified')
            }

            const article = await Article.findByIdAndDelete(id)
            res.json('success')

        } catch (e) {
            console.log(e)
            res.json({
                message: 'Server error',
                error: e
            })
        }
    }

    async update(req, res){
        try{
            const article = req.body
            const { id } = req.params
            if(!id){
                return res.status(401).json({message: 'id not specified'})
            }

            await Article.findByIdAndUpdate(id, article)
            res.json('success')

        }catch(e){
            console.log(e)
            res.json({
                message: 'Server error',
                error: e
            })
        }
    }

}

export default new articleController()