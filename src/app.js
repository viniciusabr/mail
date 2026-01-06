import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* ==============================
   🔥 CORS PRIMEIRO DE TUDO
================================ */

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
      callback(null, false); // não quebra o server
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.options('*', cors());

/* ==============================
   ⚙️ DEPOIS DISSO, O RESTO
================================ */

import helmet from 'helmet';
import "../src/database/index.js";

import emailRoutes from "./app/routes/email.routes.js";
import authRoutes from "./app/routes/auth.routes.js";
import templateRoutes from './app/routes/template.routes.js';
import adminRoutes from './app/routes/admin.routes.js';
import userRoutes from './app/routes/user.routes.js';

import { errorHandler } from "./app/middlewares/error.handler.js";

import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter.js';
import emailQueue from './queues/email.queue.js';

app.set('trust proxy', 1);

app.use(express.json());
app.use(helmet());

/* ==============================
   📌 FILAS
================================ */

const { router } = createBullBoard([
  new BullAdapter(emailQueue)
]);

app.use('/admin/queues', router);

/* ==============================
   📌 ROTAS
================================ */

app.use('/api/email', emailRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/templates', templateRoutes);

/* ==============================
   ❌ HANDLER DE ERRO
================================ */

app.use(errorHandler);

export default app;
