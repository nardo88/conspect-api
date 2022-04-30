import path from 'path'
import fs from 'fs'

class userController {

    async uploadFile(req, res) {
        try {
            // получаем файл
            const file = req.files.file

            let newpath = path.join(path.resolve(), `/data/${file.name}`)
            
            // если файл по пути уже существует возвращаем ошибку на клиент
            if(fs.existsSync(newpath)){
                return res.status(400).json({message: 'File alredy exist'})
            }
          
            file.mv(newpath)

            // возвращаем на клиент сообщение о результате
            res.json({message: newpath})
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Upload Error',
                error
            })
        }
    }
}


export default new userController()