import {
  register as registerService,
  login as loginService
} from "../services/auth.service.js"

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const user = await registerService({ name, email, password })

    const { password: _pw, ...userSafe } = user

    res.status(201).json({
      message: "Usuário registrado com sucesso",
      user: userSafe._doc
    })
  } catch (err) {
    next(err)
  }
}


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Autentica e gera token
    const token = await loginService({ email, password })

    res.status(200).json({
      message: "Login bem-sucedido",
      token
    })
  } catch (err) {
    next(err)
  }
}