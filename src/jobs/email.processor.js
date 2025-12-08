import EmailLog from "../app/models/EmailLog.js";
import generateSurveyReminder from "../app/utils/generateSurveyReminder.js";
import { sendSurveyReminderEmail } from "../app/utils/send.email.js";
import logger from "../config/logger.js";
import emailQueue from "../queues/email.queue.js";
import path from 'path';

emailQueue.process(1, async (job) => {
  const { name, email, casos, user_id } = job.data; 
  // ATENÇÃO: agora "casos" já é string formatada (Nº1234, Nº5678)

  const tentativaAtual = job.attemptsMade + 1;
  const maxTentativas = job.opts.attempts;

  logger.info(`📤 [PROCESSOR] Tentativa ${tentativaAtual}/${maxTentativas} — Enviando e-mail para: ${email}`);

  let envioStatus = 'SUCCESS';
  let errorMessage = null;

  try {
    const templatePath = path.resolve(
      process.cwd(),
      "src",
      "app",
      "utils",
      "email-template-novo.mjml"
    );

    // 👇 Agora usamos diretamente a string pronta enviada pelo email.service!
    const emailContent = generateSurveyReminder(
      templatePath,
      { nome: name, casos }
    );

    await sendSurveyReminderEmail(
      user_id,
      email,
      emailContent
    );

    logger.info(`✅ [PROCESSOR] E-mail enviado para: ${email}`);

  } catch (err) {
    envioStatus = 'FAILED';
    errorMessage = err.message;

    logger.error(`❌ [PROCESSOR] Erro ao enviar e-mail: ${email} | ${err.message}`);
    throw err;

  } finally {
    try {
      await EmailLog.create({
        user_id,
        recipient_email: email,
        caso: casos, // <-- JÁ É STRING FORMATADA!
        envio_status: envioStatus,
        sent_at: envioStatus === 'SUCCESS' ? new Date() : null,
        error_message: errorMessage,
      });

      logger.info(
        `📥 [PROCESSOR] Log salvo: ${email} | Status: ${envioStatus}`
      );

    } catch (err) {
      logger.error(
        `❌ [PROCESSOR] Falha ao salvar log: ${email} | ${err.message}`
      );
    }
  }
});
