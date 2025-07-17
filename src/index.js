import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.routes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// 🔗 Rutas
app.use('/api/auth', authRoutes)

// 🚀 Servidor y conexión a DB
const PORT = process.env.PORT || 3000

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${process.env.PORT}`)
})

})
