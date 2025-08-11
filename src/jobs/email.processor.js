// import Customer from "../app/models/Customer.js";
// import EmailLog from "../app/models/EmailLog.js";
// import generateSurveyReminder from "../app/utils/generateSurveyReminder.js";
// import { sendSurveyReminderEmail } from "../app/utils/send.email.js";
// import logger from "../config/logger.js";
// import emailQueue from "../queues/email.queue.js";


// emailQueue.process(1, async (job) => {
//   const { name, email, caso, user_id } = job.data;

//   const tentativaAtual = job.attemptsMade + 1;
//   const maxTentativas = job.opts.attempts;

//   logger.info(`📤 [PROCESSOR] Tentativa ${tentativaAtual}/${maxTentativas} — Enviando e-mail para: ${email}`);

//   try {
//     const emailContent = generateSurveyReminder(name, caso);
//     await sendSurveyReminderEmail(email, emailContent);
//     logger.info(`✅ [PROCESSOR] E-mail enviado para: ${email}`);
//   } catch (err) {
//     logger.error(`❌ [PROCESSOR] Falha na tentativa ${tentativaAtual}/${maxTentativas} — E-mail: ${email} | ${err.message}`);
//     throw err; // dispara reprocessamento pelo Bull
//   }

//   try {
//     // await Customer.create({ name, email, caso, data });
//     await EmailLog.create({
//       user_id,
//       recipient_email: email,
//       caso,
//       envio_status: 'SUCCESS',
//       sent_at: new Date()
//     })
//     logger.info(`✅ [PROCESSOR] Cliente salvo no banco: ${email}`);
//   } catch (err) {

//     logger.error(`❌ Falha ao salvar log SUCCESS: ${email} | ${err.message}`);


//     await EmailLog.create({
//       user_id,
//       recipient_email: email,
//       caso,
//       envio_status: 'FAILED',
//       error_message: err.message
//     });
//     logger.error(`❌ [PROCESSOR] Erro ao salvar cliente: ${email} | ${err.message}`);
//     throw err;
//   }
// });


//nova versao sem duplicata de envio:


import Customer from "../app/models/Customer.js";
import EmailLog from "../app/models/EmailLog.js";
import generateSurveyReminder from "../app/utils/generateSurveyReminder.js";
import { sendSurveyReminderEmail } from "../app/utils/send.email.js";
import logger from "../config/logger.js";
import emailQueue from "../queues/email.queue.js";

emailQueue.process(1, async (job) => {
  const { name, email, caso, user_id } = job.data;

  const tentativaAtual = job.attemptsMade + 1;
  const maxTentativas = job.opts.attempts;

  logger.info(`📤 [PROCESSOR] Tentativa ${tentativaAtual}/${maxTentativas} — Enviando e-mail para: ${email}`);

  // Controle de status do envio
  let envioStatus = 'SUCCESS';
  let errorMessage = null;

  try {
    const emailContent = generateSurveyReminder(name, caso);
    await sendSurveyReminderEmail(email, emailContent);
    logger.info(`✅ [PROCESSOR] E-mail enviado para: ${email}`);
  } catch (err) {
    envioStatus = 'FAILED';
    errorMessage = err.message;
    logger.error(`❌ [PROCESSOR] Erro ao enviar e-mail: ${email} | ${err.message}`);
    throw err; // Bull reprocessa
  } finally {
    try {
      await EmailLog.create({
        user_id,
        recipient_email: email,
        caso,
        envio_status: envioStatus,
        sent_at: envioStatus === 'SUCCESS' ? new Date() : null,
        error_message: errorMessage,
      });
      logger.info(`📥 [PROCESSOR] Log salvo: ${email} | Status: ${envioStatus}`);
    } catch (err) {
      logger.error(`❌ [PROCESSOR] Falha ao salvar log de ${envioStatus}: ${email} | ${err.message}`);
      // Não lança erro — log não impacta job
    }
  }
});
// import Customer from "../app/models/Customer.js";
// import EmailLog from "../app/models/EmailLog.js";
// import generateSurveyReminder from "../app/utils/generateSurveyReminder.js";
// import { sendSurveyReminderEmail } from "../app/utils/send.email.js";
// import logger from "../config/logger.js";
// import emailQueue from "../queues/email.queue.js";


// emailQueue.process(1, async (job) => {
//   const { name, email, caso, user_id } = job.data;

//   const tentativaAtual = job.attemptsMade + 1;
//   const maxTentativas = job.opts.attempts;

//   logger.info(`📤 [PROCESSOR] Tentativa ${tentativaAtual}/${maxTentativas} — Enviando e-mail para: ${email}`);

//   try {
//     const emailContent = generateSurveyReminder(name, caso);
//     await sendSurveyReminderEmail(email, emailContent);
//     logger.info(`✅ [PROCESSOR] E-mail enviado para: ${email}`);
//   } catch (err) {
//     logger.error(`❌ [PROCESSOR] Falha na tentativa ${tentativaAtual}/${maxTentativas} — E-mail: ${email} | ${err.message}`);
//     throw err; // dispara reprocessamento pelo Bull
//   }

//   try {
//     // await Customer.create({ name, email, caso, data });
//     await EmailLog.create({
//       user_id,
//       recipient_email: email,
//       caso,
//       envio_status: 'SUCCESS',
//       sent_at: new Date()
//     })
//     logger.info(`✅ [PROCESSOR] Cliente salvo no banco: ${email}`);
//   } catch (err) {

//     logger.error(`❌ Falha ao salvar log SUCCESS: ${email} | ${err.message}`);


//     await EmailLog.create({
//       user_id,
//       recipient_email: email,
//       caso,
//       envio_status: 'FAILED',
//       error_message: err.message
//     });
//     logger.error(`❌ [PROCESSOR] Erro ao salvar cliente: ${email} | ${err.message}`);
//     throw err;
//   }
// });


//nova versao sem duplicata de envio:


import Customer from "../app/models/Customer.js";
import EmailLog from "../app/models/EmailLog.js";
import generateSurveyReminder from "../app/utils/generateSurveyReminder.js";
import { sendSurveyReminderEmail } from "../app/utils/send.email.js";
import logger from "../config/logger.js";
import emailQueue from "../queues/email.queue.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

emailQueue.process(1, async (job) => {
  const { name, email, caso, user_id } = job.data;

  const tentativaAtual = job.attemptsMade + 1;
  const maxTentativas = job.opts.attempts;

  logger.info(`📤 [PROCESSOR] Tentativa ${tentativaAtual}/${maxTentativas} — Enviando e-mail para: ${email}`);

  let envioStatus = 'SUCCESS';
  let errorMessage = null;

  try {
    const __filename = fileURLToPath(import.meta.url);
     const __dirname = dirname(__filename);
   const templatePath = path.join(__dirname, '..', 'app', 'utils', 'email-template-novo.mjml');
    const emailContent = generateSurveyReminder(
    templatePath,
    { nome: name, caso } 
  );
    await sendSurveyReminderEmail(email, emailContent);
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
        caso,
        envio_status: envioStatus,
        sent_at: envioStatus === 'SUCCESS' ? new Date() : null,
        error_message: errorMessage,
      });
      logger.info(`📥 [PROCESSOR] Log salvo: ${email} | Status: ${envioStatus}`);
    } catch (err) {
      logger.error(`❌ [PROCESSOR] Falha ao salvar log de ${envioStatus}: ${email} | ${err.message}`);
    }
  }
});
