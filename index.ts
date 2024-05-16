import express from 'express'
import * as dotenv from 'dotenv'
import { ErrorHandler } from './src/utils/AppError'
import authRouter from './src/Api/auth/auth.routes'
import { guitarApi } from './src/Api/guitars'

dotenv.config()
const server = express()
const PORT = process.env.PORT
server
  .use(express.json())
  .use(authRouter)
  .get('/ping', (_, res) => {
    res.status(200).json({ message: 'pong' })
  })
  .use(guitarApi.router)
  .use(ErrorHandler)
  .listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`)
  })

