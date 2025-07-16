import express from 'express'
import { register, login } from '../controllers/auth.controller.js'

const router = express.Router()

// 🛠 Ruta para registrar usuario
// POST /api/auth/register
router.post('/register', register)

// 🛠 Ruta para iniciar sesión
// POST /api/auth/login
router.post('/login', login)

export default router
