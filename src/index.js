// 📦 Importación de módulos externos
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

// 📁 Importación de rutas
import authRoutes from './routes/auth.routes.js'

// 🛠️ Cargar variables de entorno
dotenv.config()

// 🚀 Crear instancia de la app
const app = express()

// 🧩 Middlewares globales
app.use(cors()) // Habilita CORS
app.use(express.json()) // Parsear JSON

// 🔗 Rutas principales
app.use('/api/auth', authRoutes)

// 🔌 Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  // Opcional desde mongoose v6+, pero puedes agregar:
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Conectado a MongoDB')

    // 🚀 Iniciar el servidor
    const port = process.env.PORT || 3000
    app.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${process.env.PORT}`)
})
  })
  .catch((err) => {
    console.error('❌ Error al conectar MongoDB:', err.message)
  })
