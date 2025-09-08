import {
  register as registerService,
  login as loginService
} from "../services/auth.service.js";
import logger from "../../config/logger.js";  // Importa logger
import { loginSchema, registerSchema } from "../validations/auth.validation.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!email.endsWith('@linx.com.br')) {
      logger.warn(`⚠️ [REGISTER CONTROLLER] E-mail inválido para registro: ${email}`);
      return res.status(400).json({ message: 'Cadastro permitido apenas com e-mails @linx.com.br' });
    }


    const { error } = registerSchema.validate(req.body)


    if (error) {
      logger.error(`❌ [REGISTER CONTROLLER] Erro de validação: ${error.details[0].message}`);
      return res.status(400).json({ message: error.details[0].message });
    }


    logger.info(`📥 [REGISTER CONTROLLER] Tentativa de registro: ${email}`);

    const { user } = await registerService({ name, email, password });

    const userSafe = user.get({ plain: true });
    delete userSafe.password_hash;

    logger.info(`✅ [REGISTER CONTROLLER] Registro concluído: ${email}`);

    res.status(201).json({
      message: "Usuário registrado com sucesso",
      user: userSafe,
    });

  } catch (err) {
    logger.error(`❌ [REGISTER CONTROLLER] Erro ao registrar ${req.body?.email} | ${err.message}`);
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      logger.error(`❌ [LOGIN CONTROLLER] Validação falhou: ${error.details[0].message}`);
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    logger.info(`📥 [LOGIN CONTROLLER] Tentativa de login: ${email}`);

    const {token, user} = await loginService({ email, password });

    logger.info(`✅ [LOGIN CONTROLLER] Login bem-sucedido: ${email}`);

    res.status(200).json({
      message: "Login bem-sucedido",
      token,
      user
    });
  } catch (err) {
    logger.error(`❌ [LOGIN CONTROLLER] Falha no login de ${req.body?.email} | ${err.message}`);
    next(err);
  }
};
