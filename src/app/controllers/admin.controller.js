import {
  getAllUsers as getAllUsersService,
  updateUserStatus as updateUserStatusService
} from '../services/admin.service.js'
import logger from '../../config/logger.js'

export const getAllUsers = async (_req, res, next) => {
  try {
    logger.info('📥 [ADMIN CONTROLLER] GET /users iniciado')
    const users = await getAllUsersService()
    logger.info(`✅ [ADMIN CONTROLLER] GET /users concluído | total=${users?.length ?? 0}`)
    return res.status(200).json({ message: 'sucesso', users })
  } catch (err) {
    logger.error(`❌ [ADMIN CONTROLLER] GET /users falhou | ${err.message}`)
    return next(err)
  }
}

export const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body
    logger.info(`📥 [ADMIN CONTROLLER] PATCH /users/${id}/status iniciado | novoStatus=${status}`)

    const user = await updateUserStatusService(id, status)

    logger.info(`✅ [ADMIN CONTROLLER] PATCH /users/${id}/status concluído | statusAtual=${user.status}`)
    return res.status(200).json({ message: 'Status atualizado com sucesso', user })
  } catch (err) {
    logger.error(`❌ [ADMIN CONTROLLER] PATCH /users/${req.params?.id}/status falhou | ${err.message}`)
    return next(err)
  }
}
