import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import helmet from "helmet";

import "../src/database/index.js";

import emailRoutes from "./app/routes/email.routes.js";
import authRoutes from "./app/routes/auth.routes.js"
import templateRoutes from './app/routes/template.routes.js'
import adminRoutes from './app/routes/admin.routes.js'
import userRoutes from './app/routes/user.routes.js'
import { errorHandler } from "./app/middlewares/error.handler.js";

dotenv.config();

const app = express();

app.set('trust proxy', 1);

/* 🔥 CORS TEM QUE VIR ANTES DO HELMET */
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

app.options('*', cors());

/* 🔥 helmet SEM cross-origin policies */
app.use(helmet({
  crossOriginOpenerPolicy: false,
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false
}));

app.use(express.json());

// rotas
app.use('/api/email', emailRoutes);
app.use("/api/users", userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/templates', templateRoutes);

app.use(errorHandler);

export default app;
