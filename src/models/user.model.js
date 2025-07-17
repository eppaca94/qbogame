import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
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
}, {
  timestamps: true
})

// 🔐 Encriptar contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// 🔐 Método para verificar contraseña
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

// 🔑 Método para generar token JWT
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, username: this.username, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

const User = mongoose.model('User', userSchema)
export default User