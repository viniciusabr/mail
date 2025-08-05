
//CONFIGURAÇÕES PARA utilizar o google + OAUTH2

//import nodemailer from 'nodemailer';
// import { google } from 'googleapis';
// import dotenv from 'dotenv';

// dotenv.config();

// const {
//   MAIL_CLIENT_ID,
//   MAIL_CLIENT_SECRET,
//   MAIL_REDIRECT_URI,
//   MAIL_REFRESH_TOKEN,
//   MAIL_USER_EMAIL,
//   MAIL_EMAIL_SERVICE
// } = process.env;

// const oAuth2Client = new google.auth.OAuth2(
//   MAIL_CLIENT_ID,
//   MAIL_CLIENT_SECRET,
//   MAIL_REDIRECT_URI
// );

// oAuth2Client.setCredentials({ refresh_token: MAIL_REFRESH_TOKEN });

// export const USER_EMAIL = MAIL_USER_EMAIL;

// export async function createTransporter() {
//   try {
//     const accessToken = await oAuth2Client.getAccessToken();

//     const transporter = nodemailer.createTransport({
//       service: MAIL_EMAIL_SERVICE,
//       auth: {
//         type: 'OAuth2',
//         user: MAIL_USER_EMAIL,
//         clientId: MAIL_CLIENT_ID,
//         clientSecret: MAIL_CLIENT_SECRET,
//         refreshToken: MAIL_REFRESH_TOKEN,
//         accessToken: accessToken.token,
//       }
//     });

//     return transporter;
//   } catch (error) {
//     console.error('Erro ao criar transporter OAuth2:', error);
//     throw error;
//   }
// }





// CONFIGURAÇÕES PARA UTILIZAR GOOGLE + SENHA DE APLICATIVO
// 



// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const {
//   MAIL_USER_EMAIL,
//   MAIL_APP_PASSWORD // ← nova variável no .env
// } = process.env;

// export const USER_EMAIL = MAIL_USER_EMAIL;

// export async function createTransporter() {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: MAIL_USER_EMAIL,
//         pass: 'rhoh jsur xxgc gpjh'
//       }
//     });

//     return transporter;
//   } catch (error) {
//     console.error('Erro ao criar transporter com senha de app:', error);
//     throw error;
//   }
// }
