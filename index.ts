import express from 'express'
import * as dotenv from 'dotenv'
import { ErrorHandler } from './src/utils/AppError'
import authRouter from './src/auth/auth.routes'
import { PrismaClient } from '@prisma/client'

dotenv.config()
const server = express()
const PORT = process.env.PORT
export const prisma = new PrismaClient()
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

