import User from "../models/User.js";
import bcrypt from "bcrypt"; // usado apenas para password normal

// 📌 Buscar usuário por ID
export async function getUserById(
  id,
  includePassword = false,
  includeAppPassword = false
) {
  const attributes = [
    "id",
    "name",
    "email",
    "user_adm",
    "status",
    "createdAt",
    "updatedAt",
  ];

  if (includePassword) attributes.push("password_hash");
  if (includeAppPassword) attributes.push("app_password");

  return await User.findByPk(id, { attributes });
}

// 📌 Atualizar qualquer campo do usuário (sem retornar senhas)
export async function updateUser(id, data) {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.update(data);

  // remove senhas antes de retornar
  const { password_hash, app_password, ...safe } = user.toJSON();
  return safe;
}

// 📌 Atualizar senha normal do sistema (HASH)
export async function updatePassword(id, newPassword) {
  const user = await User.findByPk(id);
  if (!user) return null;

  const hashed = await bcrypt.hash(newPassword, 10);

  await user.update({ password_hash: hashed });
  return true;
}

// 📌 Atualizar senha do aplicativo (SEM HASH)
export async function updateAppPassword(id, newAppPassword) {
  const user = await User.findByPk(id);
  if (!user) return null;

  // salva SEM hash
  await user.update({ app_password: newAppPassword });
  return true;
}

// 📌 Obter a senha do aplicativo
export async function getAppPassword(id) {
  const user = await User.findByPk(id, {
    attributes: ["app_password"],
  });

  return user?.app_password || null;
}
