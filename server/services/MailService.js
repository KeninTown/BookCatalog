import nodemailer from 'nodemailer'
import fs from 'fs'
import * as path from 'path';
import dotenv from 'dotenv'
dotenv.config();

class MailService{
    //создание транспорта для отправки сообщений
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_APP_KEY
            }
        })
    }

    //отправка письма с ссылкой активации
    async sendActivateMail(to, link){
        let mail = fs.readFileSync(path.resolve('static', 'activateAccountMessage.html'), 'utf-8');

        mail = mail.replace('activationLink', `${link}`);

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Подтвердите аккаунт',
            text: '',
            html: mail
        })
    }
}

export default new MailService();