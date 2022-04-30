import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import cors from 'cors'
import userRouter from './routers/user.router.js'

const PORT = 5000
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/auth', userRouter)

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