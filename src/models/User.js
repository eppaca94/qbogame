// Importamos mongoose para definir el esquema y el modelo
import mongoose from 'mongoose'

// Definimos el esquema del usuario con validaciones básicas
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'El nombre de usuario es obligatorio'],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio'],
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Debe ser un correo válido']
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    role: {
      type: String,
      enum: ['player', 'admin'],
      default: 'player'
    }
  },
  {
    timestamps: true // Crea automáticamente `createdAt` y `updatedAt`
  }
)

// Creamos y exportamos el modelo de usuario
const User = mongoose.model('User', userSchema)
export default User
