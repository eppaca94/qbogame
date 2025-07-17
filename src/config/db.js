import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI
    console.log('🔍 MONGODB_URI:', uri)
    await mongoose.connect(uri)
    console.log('✅ Base de datos conectada correctamente')
  } catch (error) {
    console.error('❌ Error al conectar MongoDB:', error.message)
    process.exit(1)
  }
}
