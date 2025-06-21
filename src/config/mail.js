require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');


// Credenciais do OAuth2
const CLIENT_ID = process.env.MAIL_CLIENT_ID; // Substitua
const CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET; // Substitua
const REDIRECT_URI = process.env.MAIL_REDIRECT_URI;
const REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN; // Substitua
const USER_EMAIL = process.env.MAIL_USER_EMAIL; // Substitua

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function createTransporter() {
    try {
        const { token: accessToken } = await oAuth2Client.getAccessToken();
        console.log('Access Token obtido (config):', accessToken);

        const transporter = nodemailer.createTransport({
            service: process.env.MAIL_EMAIL_SERVICE,
            auth: {
                type: 'OAuth2',
                user: USER_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        return transporter;
    } catch (error) {
        console.error('Erro ao criar o transportador:', error);
        throw error;
    }
}

module.exports = { createTransporter, USER_EMAIL };