import emailQueue from "../queues/email.queue.js";
import logger from "../config/logger.js";

export const addEmailToQueue = async (data) => {
  try {
    logger.info(`📥 [QUEUE] Adicionando job na fila: ${data.email}`);

    await emailQueue.add(data, {
      attempts: 3,
      backoff: 5000
    });

    logger.info(`✅ [QUEUE] Job adicionado com sucesso: ${data.email}`);
  } catch (err) {
    logger.error(`❌ [QUEUE] Erro ao adicionar job na fila para: ${data.email} | ${err.message}`);
    throw err;
  }
};
