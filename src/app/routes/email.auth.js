import express from 'express'
import { authenticateEmail } from '../controllers/email.auth.controller.js'

const router = express()

router.post('/auth', authenticateEmail)

export default router

// essa rota nao funciona por bloqueio de envio de email pela microsoft via postMan e informações dinamicas