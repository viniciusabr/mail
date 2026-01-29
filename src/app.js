import dotenv from 'dotenv'
import express from "express"
import cors from "cors"
import helmet from "helmet"

import "../src/database/index.js"

import emailRoutes from "./app/routes/email.routes.js"
import authRoutes from "./app/routes/auth.routes.js"
import templateRoutes from './app/routes/template.routes.js'
import adminRoutes from './app/routes/admin.routes.js'
import userRoutes from './app/routes/user.routes.js'
import { errorHandler } from "./app/middlewares/error.handler.js"

dotenv.config()

const app = express()

app.set('trust proxy', 1)

/* 🔒 CORS — LIBERADO SOMENTE PARA A VPS */
const allowedOrigins = [
  'http://72.61.27.91',
  'https://72.61.27.91',
  'http://72.61.27.91:3000',
  'http://72.61.27.91:5173'
]

app.use(cors({
  origin: (origin, callback) => {
    // permite chamadas sem origin (Postman, backend, cron)
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('CORS bloqueado'), false)
  },
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}))

app.options('*', cors())

/* 🔥 Helmet sem cross-origin policies */
app.use(helmet({
  crossOriginOpenerPolicy: false,
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false
}))

app.use(express.json())

// rotas
app.use('/api/email', emailRoutes)
app.use("/api/users", userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/templates', templateRoutes)

app.use(errorHandler)

export default app

