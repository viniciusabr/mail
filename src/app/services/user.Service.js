import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function getUserById(id, includePassword = false) {
  const attributes = ["id", "name", "email", "user_adm", "status", "createdAt", "updatedAt"];
  if (includePassword) attributes.push("password_hash");

  const user = await User.findByPk(id, { attributes });
  return user;
}


export async function updateUser(id, data) {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.update(data);

  const { password_hash, ...safeUser } = user.toJSON();
  return safeUser;
}

export async function updatePassword(id, newPassword) {
  const user = await User.findByPk(id);
  if (!user) return null;

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await user.update({ password_hash: hashedPassword });

  return true;
}