import { Router } from "express";
import { getAllCustomers, createCustomerAndSendEmail } from "../controllers/customers.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { limiter } from "../middlewares/rate.limit.js";

const router = Router()

router.post("/customers", authenticate, limiter, createCustomerAndSendEmail)

router.get("/customers", getAllCustomers)

export default router