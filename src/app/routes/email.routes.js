import { Router } from "express";
import { getAllCustomers, sendCustomerEmails } from "../controllers/email.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { limiter } from "../middlewares/rate.limit.js";

const router = Router()

router.post("/customers", authenticate, limiter, sendCustomerEmails)

router.get("/customers", getAllCustomers)

export default router