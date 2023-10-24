import nodemailer from 'nodemailer';
import CustomError from '../services/errors/custom_error.js';

export default class Mail{
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.titan.email",
            port: process.env.MAIL_PORT || 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER || "contact@jcerme.com",
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }

    sendMail = async (data) => {
        // send mail with defined transport object
        if(!data.to) CustomError.createError(
            13,
            'Missing parameter',
            'Missing parameter \'to\' when sending an email',
            'User have to send a valid email address'
        )

        if(!data.html) CustomError.createError(
            13,
            'Missing parameter',
            'Missing parameter \'html\' when sending an email',
            'User have to send a valid html content'
        )

        await this.transporter.sendMail({
            from: process.env.FROM_MAIL || '"JCerme - Full Stack Developer 💜" <contact@jcerme.com>',
            to: data.to, // list of receivers
            subject: data.subject, // Subject line
            text: data.plain_text || data.html, // plain text body
            html: data.html || data.plain_text, // html body
        });
    }
}