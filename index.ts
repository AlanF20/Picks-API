import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()
const server = express()
const PORT = process.env.PORT
server
  .use(express.json())
  .get('/ping', (_, res) => {
    try {
      res.status(200).json({ message: 'pong' })
    } catch (err) {
      res.status(400).json({ err })
    }
  })
  .listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`)
  })
