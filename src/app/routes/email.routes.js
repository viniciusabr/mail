import { Router } from "express";
import { sendCustomerEmails } from "../controllers/email.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { limiter } from "../middlewares/rate.limit.js";

const router = Router()

router.post("/send", authenticate, limiter, sendCustomerEmails)

export default router