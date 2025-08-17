import User from "../models/User.js"

export const getAllUsers = async () => {
  return await User.findAll({
    attributes: ['id', 'name', 'email', 'status', 'user_adm'], // só os campos relevantes
  })
}
