import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import cors from 'cors'
import userRouter from './routers/user.router.js'
import fileRouter from './routers/file.router.js'
import path from 'path'
import fileUpload from 'express-fileupload'


const PORT = 5000
const app = express()

app.use(express.json())
app.use(cors())
app.use(fileUpload({
    
}))

app.use('/api/v1/auth', userRouter)
app.use('/api/v1/file', fileRouter)

async function start(){
    try{

        await mongoose.connect(config.get('mongoUrl'), {useUnifiedTopology: true, useNewUrlParser: true})
        
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch(e){
        console.log(e)
    }

}

start()