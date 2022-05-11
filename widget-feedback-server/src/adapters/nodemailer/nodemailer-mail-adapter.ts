import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from "../mail-adapter";

/* email configuration */
var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "52265e05c25cf2",
        pass: "916d9ba8377d96"
    }
});


export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        /* Send e-mail */
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Rafael Bertolim Pavanello <rpavanello@gmail.com>',
            subject,
            html: body,
            // html: 
        })
    }
}