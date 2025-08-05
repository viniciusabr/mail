import express from 'express'
import { login, register } from '../controllers/auth.controller.js'
import { loginLimiter } from '../middlewares/login.limiter.js'

const router = express.Router()

router.post('/register', register)

router.post('/login', loginLimiter, login)

export default router