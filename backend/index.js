
import http from 'http'
import express from 'express'
import dotenv from 'dotenv'


const app = express()
dotenv.config()
const port = process.env.PORT


app.use(express.json())


app.listen(port, () => {
    console.log(`Port is running in ${port}`)
})


