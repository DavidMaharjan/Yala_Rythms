import express from 'express'
import connect from './db/connect.js'
import router from './route/user.js'
import cors from 'cors'
import productRouter from './route/product.js'
import dotenv from 'dotenv'
const app = express()
dotenv.config()
const port = process.env.PORT
connect()
app.use(express.json())
app.use(cors())
app.use(router)
app.use(productRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
