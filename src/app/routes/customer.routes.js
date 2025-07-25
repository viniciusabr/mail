import { Router } from "express";
import { getAllCustomers, createCustomerAndSendEmail } from "../controllers/customers.controller.js";

const router = Router()

router.post("/customers", createCustomerAndSendEmail)

router.get("/customers", getAllCustomers)

export default router