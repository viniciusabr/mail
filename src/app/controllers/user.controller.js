import logger from "../../config/logger.js";
import * as userService from "../services/user.service.js";
import bcrypt from "bcrypt";

export const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id); // password_hash não incluído

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    logger.info(
      `✅ [USER CONTROLLER] GET /users/me concluído | nomeAtual=${user.name} emailAtual=${user.email}`
    );

    res.json(user);
  } catch (error) {
    logger.error(`❌ [USER CONTROLLER] Erro no getProfile | ${error.message}`);
    res.status(500).json({ error: "Erro ao buscar perfil" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await userService.updateUser(req.user.id, { name, email });

    if (!updatedUser) return res.status(404).json({ error: "Usuário não encontrado" });

    logger.info(
      `✅ [USER CONTROLLER] PUT /users/me concluído | nomeAtual=${updatedUser.name} emailAtual=${updatedUser.email}`
    );

    res.json({ message: "Perfil atualizado com sucesso", user: updatedUser });
  } catch (error) {
    logger.error(`❌ [USER CONTROLLER] Erro no updateProfile | ${error.message}`);
    res.status(500).json({ error: "Erro ao atualizar perfil" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Informe a senha antiga e a nova senha" });
    }

    const user = await userService.getUserById(req.user.id, true);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: "Senha antiga incorreta" });

    await userService.updatePassword(req.user.id, newPassword);

    logger.info(
      `✅ [USER CONTROLLER] PUT /users/me/password concluído | senha alterada com sucesso do usuário=${user.name} email=${user.email}`
    );

    res.json({ message: "Senha alterada com sucesso" });
  } catch (error) {
    logger.error(`❌ [USER CONTROLLER] Erro no changePassword | ${error.message}`);
    res.status(500).json({ error: "Erro ao alterar senha" });
  }
};
