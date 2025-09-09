import { Router } from "express";
import { generateTemplate } from "../controllers/template.controller.js";


const router = Router()

router.post('/generate', generateTemplate)

router.post('/save')

router.get('/')

router.get('/:id')


export default router