import logger from "../../config/logger.js";
import {
  sendCustomerEmails as sendCustomerEmailsService,
} from "../services/email.service.js";

import { validateDuplicates } from "../utils/validate.duplicates.js";
import { customersArraySchema } from "../validations/customer.validation.js";
import * as userService from "../services/user.Service.js";
import bcrypt from "bcrypt";


export const sendCustomerEmails = async (req, res, next) => {
  const { data } = req.body
  try {
    if (data.length > 40) {
      logger.warn(`⚠️ [CUSTOMER CONTROLLER] Tentativa de envio com ${data.length} e-mails — limite é 40`);
      return res.status(429).json({ error: 'Máximo de 40 e-mails por requisição.' });
    }

    validateDuplicates(data)
    const { error } = customersArraySchema.validate(data);

    if (error) {
      logger.error(`❌ [CUSTOMER CONTROLLER] Validação falhou: ${error.details[0].message}`);
      return res.status(400).json({ error: error.details[0].message });
    }

    const { id: user_id } = req.user

    const result = await sendCustomerEmailsService(data, user_id);
    return res.status(200).json(result);
  } catch (err) {
    logger.error(`❌ [CUSTOMER CONTROLLER] Erro inesperado no envio de e-mails | ${err.message}`);
    next(err);
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id); // password_hash não incluído

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    logger.info(`✅ [PROFILE CONTROLLER] GET /users/me concluído | nomeAtual=${user.name} emailAtual=${user.email}`)

    res.json(user);
  } catch (error) {
    console.error("Erro no getProfile:", error);
    res.status(500).json({ error: "Erro ao buscar perfil" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await userService.updateUser(req.user.id, { name, email });

    if (!updatedUser) return res.status(404).json({ error: "Usuário não encontrado" });

    logger.info(
      `✅ [PROFILE CONTROLLER] PUT /users/me concluído | nomeAtual=${updatedUser.name} emailAtual=${updatedUser.email}`
    );

    res.json({ message: "Perfil atualizado com sucesso", user: updatedUser });
  } catch (error) {
    console.error("Erro no updateProfile:", error);
    res.status(500).json({ error: "Erro ao atualizar perfil" });
  }
};


export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Informe a senha antiga e a nova senha" });
    }

    // Inclui password_hash para comparar
    const user = await userService.getUserById(req.user.id, true);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    // Verifica senha antiga
    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: "Senha antiga incorreta" });

    // Atualiza senha
    await userService.updatePassword(req.user.id, newPassword);

    logger.info(`✅ [PROFILE CONTROLLER] PUT /users/me/password concluído | Senha alterada com sucesso do usuário =${user.name} email=${user.email}`)

    res.json({ message: "Senha alterada com sucesso" });
  } catch (error) {
    console.error("Erro no changePassword:", error);
    res.status(500).json({ error: "Erro ao alterar senha" });
  }
};