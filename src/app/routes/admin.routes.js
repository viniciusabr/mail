import express from 'express'
import { getAllUsers, updateUserStatus, updateUserAdm } from '../controllers/admin.controller.js'
import {authenticate } from '../middlewares/auth.middleware.js'
import { onlyAdmin } from '../middlewares/admin.middleware.js'
 
const router = express.Router()

router.get('/users', authenticate, onlyAdmin, getAllUsers)

router.patch('/users/:id/status', authenticate, onlyAdmin, updateUserStatus)

router.patch('/users/:id/adm', authenticate, onlyAdmin, updateUserAdm)


export default router