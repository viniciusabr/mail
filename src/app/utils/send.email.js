// import { createTransporter, enviarEmail, USER_EMAIL } from "../../config/mail";

// export const sendSurveyReminderEmail = async (destinatario, corpoHTML) => {
//   try {
//     const transporter = await createTransporter();

//     const mailOptions = {
//       from: `Pesquisa de satisfação microvix <${USER_EMAIL}>`, // Altere para o nome da sua aplicação
//       to: destinatario,
//       subject: 'Lembrete!! Pesquisa de Satifação Microvix',
//       html: corpoHTML,
//     };

//     console.log('Enviando e-mail...');
//     const info = await transporter.sendMail(mailOptions);
//     console.log('E-mail enviado:', info.response);
//     return info;

//   } catch (error) {
//     console.error('Erro ao enviar e-mail (sender):', error);
//     throw error;
//   }
// }





// import { enviarEmail, USER_EMAIL } from '../../config/mail.js';

// export const sendSurveyReminderEmail = async (destinatario, corpoHTML) => {
//   try {
//     const mailOptions = {
//       from: `Pesquisa de satisfação microvix <${USER_EMAIL}>`,
//       to: destinatario,
//       subject: 'Lembrete!! Pesquisa de Satisfação Microvix',
//       html: corpoHTML
//     };

//     console.log('Enviando e-mail...');
//     const info = await enviarEmail(mailOptions);
//     console.log('E-mail enviado:', info.response || info.messageId);
//     return info;
//   } catch (error) {
//     console.error('Erro ao enviar e-mail (sender):', error);
//     throw error;
//   }
// };

import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

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
  }
});


export const sendSurveyReminderEmail = async (recipientEmail, htmlContent) => {
  try {
    const mailOptions = {
      from: `Pesquisa de Satisfação Microvix <${USER_EMAIL}>`,
      to: recipientEmail,
      subject: '🗓️ Lembrete: Pesquisa de Satisfação Microvix',
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso:', info.messageId);
    return info;
  } catch (error) {
    console.error('Falha ao enviar o e-mail de lembrete:', error);
    throw error;
  }
};

