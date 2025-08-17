import { getAllUsers as getAllUsersService } from '../services/admin.service.js'

const getAllUsers = async (_req, res, _next) => {
  const users = await getAllUsersService()
  res.status(200).json({ message: 'sucesso', users })
}

export default getAllUsers