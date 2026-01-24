import User from "../models/User.js"
import logger from "../../config/logger.js"

export const getAllUsers = async () => {
  return User.findAll({
    attributes: ['id', 'name', 'email', 'status', 'user_adm'],
  })
}

export const updateUserStatus = async (id, status) => {
  if (!['ativo', 'inativo'].includes(status)) {
    logger.warn(`⚠️ [ADMIN SERVICE] Status inválido recebido: ${status}`)
    const error = new Error('Status inválido')
    error.statusCode = 400
    throw error
  }

  const user = await User.findByPk(id)

  if (!user) {
    logger.warn(`⚠️ [ADMIN SERVICE] Usuário não encontrado: userId=${id}`)
    const error = new Error('Usuário não encontrado')
    error.statusCode = 404
    throw error
  }

  user.status = status
  await user.save()

  logger.info(`✅ [ADMIN SERVICE] Status atualizado: userId=${id} -> ${user.status}`)

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    status: user.status,
    user_adm: user.user_adm
  }
}

export const updateUserAdm = async (id, user_adm) => {
  const parsedAdm =
    user_adm === true || user_adm === 1 ? true :
    user_adm === false || user_adm === 0 ? false : null

  if (parsedAdm === null) {
    logger.warn(`⚠️ [ADMIN SERVICE] user_adm inválido recebido: ${user_adm}`)
    const error = new Error('Valor de user_adm inválido')
    error.statusCode = 400
    throw error
  }

  const user = await User.findByPk(id)

  if (!user) {
    logger.warn(`⚠️ [ADMIN SERVICE] Usuário não encontrado: userId=${id}`)
    const error = new Error('Usuário não encontrado')
    error.statusCode = 404
    throw error
  }

  user.user_adm = parsedAdm
  await user.save()

  logger.info(`✅ [ADMIN SERVICE] user_adm atualizado: userId=${id} -> ${user.user_adm}`)

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    status: user.status,
    user_adm: user.user_adm
  }
}

