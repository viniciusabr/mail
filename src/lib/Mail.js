require('dotenv').config();
import Nodemeiler from "nodemailer";

import mailConfig from "../config/mail";


const host = 'smtp.gmail.com'
class Mail {
    
    constructor(){
        const { port, secure, auth } = mailConfig;
        this.transporter = Nodemeiler.createTransport({
           host,
            port,
            secure,
            auth: auth ? auth:null,
    });
    }

    send(message){
        return this.transporter.sendMail({
            ...mailConfig.default,
            ...message,
        })

    }

}
export default new Mail;