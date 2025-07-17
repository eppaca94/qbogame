import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import dotenv from 'dotenv'
import User from '../models/user.model.js'


// Cargamos variables de entorno
dotenv.config()

// 🔐 Función para registrar un nuevo usuario
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Verificamos si el usuario ya existe por email o username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' })
    }

    // Encriptamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Creamos un nuevo usuario
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    // Guardamos el usuario en la base de datos
    await newUser.save()

    return res.status(201).json({ message: 'Usuario registrado correctamente' })
  } catch (error) {
    console.error('❌ Error en el registro:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// 🔐 Función para iniciar sesión
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Buscamos al usuario por email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    // Comparamos contraseñas
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' })
    }

    // Generamos un token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    )

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
