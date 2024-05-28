import express from 'express'
import * as dotenv from 'dotenv'
import { ErrorHandler } from './src/utils/AppError'
import authRouter from './src/Api/auth/auth.routes'
import { guitarApi } from './src/Api/guitars'
import cors from 'cors'
import { authenticateToken } from './src/utils/AuthToken'

dotenv.config()
const server = express()
const PORT = process.env.PORT
server
  .use(express.json())
  .use(cors())
  .get('/', (req, res) => res.send("Hello world"))
  .use(authRouter)
  .get('/ping', (_, res) => {
    res.status(200).json({ message: 'pong' })
  })
  .use(authenticateToken)
  .use(guitarApi.router)
  .use(ErrorHandler)
  .listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`)
  })

