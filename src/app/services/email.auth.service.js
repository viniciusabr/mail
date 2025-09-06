import nodemailer from 'nodemailer';

// export const authenticateEmail = async (email, password) => {
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.office365.com',
//     port: 587,
//     secure: false,
//     auth: { user: email, pass: password },
//     tls: { ciphers: 'SSLv3' }
//   });

//   try {
//     await transporter.sendMail({
//       from: email,
//       to: email,
//       subject: '.',
//       text: '.'
//     });
//     return { message: 'Credenciais válidas e e-mail enviado com sucesso' };
//   } catch (error) {
//     console.log(error);
//     throw new Error('Falha ao autenticar e enviar e-mail. Verifique o e-mail e a senha de aplicativo.');
//   }
// }



// export const authenticateEmail = async (email, password) => {
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.office365.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: email,
//       pass: password
//     },
//     tls: { ciphers: 'SSLv3' }
//   });

//   try {
//     await transporter.verify(); // Apenas autentica
//     return 'Credenciais válidas';
//   } catch (err) {
//     throw new Error('E-mail ou senha inválidos. Verifique se está usando uma senha de aplicativo.');
//   }
// };


// codigo aqui nao funciona por questões de segurança da microsoft