// Importaciones necesarias
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// Cargamos variables de entorno
dotenv.config()

/**
 * 📝 Controlador para registrar un nuevo usuario
 * @route POST /api/auth/register
 * @access Público
 */
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Validamos que no exista un usuario con ese email o username
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    })
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' })
    }

    // Creamos y guardamos el nuevo usuario
    const newUser = new User({ username, email, password })
    await newUser.save()

    return res.status(201).json({ message: 'Usuario registrado correctamente' })
  } catch (error) {
    console.error('❌ Error en el registro:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}

/**
 * 🔑 Controlador para iniciar sesión
 * @route POST /api/auth/login
 * @access Público
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Verificamos que el usuario exista
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    // Validamos la contraseña
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' })
    }

    // Generamos el token
    const token = user.generateToken()

    return res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('❌ Error en el login:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}
