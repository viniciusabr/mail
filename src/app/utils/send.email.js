//NODEMAILER configurado para utilização de envio via server da Microsoft (Outlook)

// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// import logger from '../../config/logger.js'

// dotenv.config();

// export const USER_EMAIL = process.env.OUTLOOK_USER;
// const USER_PASS = process.env.OUTLOOK_PASS;

// export const transporter = nodemailer.createTransport({
//   host: 'smtp.office365.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: USER_EMAIL,
//     pass: USER_PASS
//   },
//   tls: {
//     ciphers: 'SSLv3'
//   },
//   connectionTimeout: 10000, // 10s
//   greetingTimeout: 10000,
//   socketTimeout: 10000,
// });

// export const sendSurveyReminderEmail = async (recipientEmail, htmlContent) => {
//   // throw new Error('Erro forçado pra testar processamento')
//   try {
//     const mailOptions = {
//       from: `Pesquisa de Satisfação Microvix <${USER_EMAIL}>`,
//       to: recipientEmail,
//       subject: '🗓️ Lembrete: Pesquisa de Satisfação - Microvix',
//       html: htmlContent,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     return info;

//   } catch (error) {
//     logger.error(`❌ Falha ao enviar e-mail para: ${recipientEmail} | ${error.message}`); // ← Log do erro
//     throw error;
//   }
// };




import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";
import logger from "../../config/logger.js";

dotenv.config();

// 1️⃣ Cria instância do cliente
const client = SibApiV3Sdk.ApiClient.instance;

// 2️⃣ Configura a autenticação via API KEY
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

// 3️⃣ Cria o objeto que usaremos para enviar e-mails
export const brevoApi = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * Envia e-mail de lembrete de pesquisa via Brevo API
 */
export const sendSurveyReminderEmail = async (recipientEmail, htmlContent) => {
  try {
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const senderName = process.env.BREVO_SENDER_NAME || 'Equipe CSAT';
    const replyToEmail = process.env.REPLY_TO_EMAIL;

    const payload = {
      sender: { email: senderEmail, name: senderName },
      replyTo: { email: replyToEmail },
      to: [{ email: recipientEmail }],
      subject: "🗓️ Lembrete: Pesquisa de Satisfação - Microvix",
      htmlContent
    };

    const response = await brevoApi.sendTransacEmail(payload);
    logger.info(`✅ E-mail enviado para ${recipientEmail} | Message ID: ${response.messageId || 'sem ID'}`);
    return response;
  } catch (error) {
    logger.error(`❌ Erro ao enviar e-mail via Brevo: ${error.message}`);
    throw error;
  }
};







