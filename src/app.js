import dotenv from 'dotenv'
import express from "express";
import "../src/database/index.js";
import cors from "cors";
import customerRoutes from "./app/routes/customer.routes.js";
import emailAuthRoutes from "./app/routes/email.auth.js"
import { errorHandler } from "./app/middlewares/error.handler.js";
import authRoutes from "./app/routes/auth.routes.js"
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter.js';
import emailQueue from './queues/email.queue.js';
import helmet from 'helmet';
import adminRoutes from './app/routes/admin.routes.js'

const { router } = createBullBoard([
  new BullAdapter(emailQueue)
]);


dotenv.config()

const app = express()

app.use(express.json())

app.use(helmet());

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/admin/queues', router);

app.use('/api', customerRoutes)

app.use('/api/auth', authRoutes)

app.use('/api/admin', adminRoutes)


// app.use('/api/auth', emailAuthRoutes)

app.use(errorHandler)


export default app
