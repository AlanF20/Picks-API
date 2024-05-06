import express from 'express'
import * as dotenv from 'dotenv'
import { ErrorHandler } from './src/utils'
import authRouter from './src/auth/auth.routes'

dotenv.config()
const server = express()
const PORT = process.env.PORT
server
  .use(express.json())
  .use(authRouter)
  .get('/ping', (_, res, next) => {
    try {
      res.status(200).json({ message: 'pong' })
    } catch (err) {
      next(err)
    }
  })
  .use(ErrorHandler)
  .listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`)
  })
