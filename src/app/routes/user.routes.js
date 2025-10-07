import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getProfile, updateProfile, changePassword } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", authenticate, getProfile);
router.put("/me", authenticate, updateProfile);
router.put("/me/password", authenticate, changePassword);

export default router;
