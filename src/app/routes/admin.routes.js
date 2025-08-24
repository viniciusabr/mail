import express from 'express'
import { getAllUsers, updateUserStatus } from '../controllers/admin.controller.js'

const router = express.Router()

router.get('/users', getAllUsers)

router.patch('/users/:id/status', updateUserStatus)

export default router