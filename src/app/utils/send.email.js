//NODEMAILER configurado para utilização de envio via server da Microsoft (Outlook)

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from '../../config/logger.js'

dotenv.config();

export const USER_EMAIL = process.env.OUTLOOK_USER;
const USER_PASS = process.env.OUTLOOK_PASS;

export const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: USER_EMAIL,
    pass: USER_PASS
  },
  tls: {
    ciphers: 'SSLv3'
  },
  connectionTimeout: 10000, // 10s
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export const sendSurveyReminderEmail = async (recipientEmail, htmlContent) => {
  // throw new Error('Erro forçado pra testar processamento')
  try {
    const mailOptions = {
      from: `Pesquisa de Satisfação Microvix <${USER_EMAIL}>`,
      to: recipientEmail,
      subject: '🗓️ Lembrete: Pesquisa de Satisfação - Microvix',
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;

  } catch (error) {
    logger.error(`❌ Falha ao enviar e-mail para: ${recipientEmail} | ${error.message}`); // ← Log do erro
    throw error;
  }
};

















//versao utilização via google + OAUTH2:


// import { createTransporter, USER_EMAIL } from "../../config/mail.js";

// export const sendSurveyReminderEmail = async (destinatario, corpoHTML) => {
//   try {
//     console.time('⏱️ Criação do transporter');
//     const transporter = await createTransporter();
//     console.timeEnd('⏱️ Criação do transporter');

//     if (!transporter) {
//       throw new Error('❌ Transporter não foi criado corretamente.');
//     }

//     const mailOptions = {
//       from: `Pesquisa de Satisfação Microvix <${USER_EMAIL}>`,
//       to: destinatario,
//       subject: '🗓️ Lembrete: Pesquisa de Satisfação Microvix',
//       html: corpoHTML
//     };

//     console.log('📨 Enviando e-mail para:', destinatario);

//     console.time('⏱️ Tempo de envio do e-mail');

//     const info = await Promise.race([
//       transporter.sendMail(mailOptions),
//       new Promise((_, reject) =>
//         setTimeout(() => reject(new Error('⏰ Timeout: envio de e-mail excedeu 15 segundos.')), 15000)
//       )
//     ]);

//     console.timeEnd('⏱️ Tempo de envio do e-mail');
//     console.log('✅ E-mail enviado com sucesso:', info.response || info.messageId);
//     return info;

//   } catch (error) {
//     console.error('❌ Erro ao enviar e-mail (Gmail):', error.message || error);
//     throw error;
//   }
// };






//VERSÃO GOOGLE + SENHA DE APLICATIVO
// import { createTransporter, USER_EMAIL } from '../../config/mail.js';

// export const sendSurveyReminderEmail = async (destinatario, corpoHTML) => {
//   try {
//     const transporter = await createTransporter();

//     const mailOptions = {
//       from: `Pesquisa de Satisfação Microvix <${USER_EMAIL}>`,
//       to: destinatario,
//       subject: '🗓️ Lembrete: Pesquisa de Satisfação Microvix',
//       html: corpoHTML
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log('✅ E-mail enviado para:', destinatario, info.messageId);
//     return info;

//   } catch (error) {
//     console.error('❌ Erro ao enviar e-mail:', error);
//     throw error;
//   }
// };
