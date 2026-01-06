import dotenv from 'dotenv'
import express from "express";
import "../src/database/index.js";
import cors from "cors";
import emailRoutes from "./app/routes/email.routes.js";
import { errorHandler } from "./app/middlewares/error.handler.js";
import authRoutes from "./app/routes/auth.routes.js"
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter.js';
import emailQueue from './queues/email.queue.js';
import helmet from 'helmet';
import templateRoutes from './app/routes/template.routes.js'
import adminRoutes from './app/routes/admin.routes.js'
import userRoutes from './app/routes/user.routes.js'

dotenv.config()

const app = express()

app.set('trust proxy', 1);

app.use(express.json())
app.use(helmet());

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://mail-front-producao.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// 🔥 MUITO IMPORTANTE (preflight)
app.options('*', cors());

const { router } = createBullBoard([
  new BullAdapter(emailQueue)
]);

app.use('/admin/queues', router);
app.use('/api/email', emailRoutes)
app.use("/api/users", userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/templates', templateRoutes)

app.use(errorHandler)

export default app
