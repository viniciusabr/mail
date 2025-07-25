import { authenticateEmail as authenticateEmailService } from "../services/email.auth.service.js"

export const authenticateEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const verify = await authenticateEmailService({ email, password })
    return res.status(200).json({
      message: 'Autenticação bem-sucedida',
      data: verify
    })
  } catch (error) {
    next(error)
  }

}