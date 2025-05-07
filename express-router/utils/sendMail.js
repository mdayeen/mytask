import nodemailer from "nodemailer";
import config from "config";

let { HOST, AUTH, PORT } = config.get("EMAIL_SMTP");

async function sendEmail(mailBody) {
    try {
        let transporter = nodemailer.createTransport({
            host: HOST,
            port: PORT,
            // secure: false,
            auth: {
                user: AUTH["USER"],
                pass: AUTH["PASSWORD"]
            },
            // tls: {
            //     rejectUnauthorized: false
            // }
        });

        // Log the email configuration (excluding password)
        console.log('Email Configuration:', {
            host: HOST,
            port: PORT,
            user: AUTH["USER"],
            secure: false
        });

        // Verify connection configuration
        await transporter.verify();
        console.log('SMTP connection verified successfully');

        // Log the email being sent
        console.log('Attempting to send email to:', mailBody.to);
        console.log('Email subject:', mailBody.subject);

        let info = await transporter.sendMail({
            from: {
                name: 'CFI Tasky Solutions',
                address: AUTH["USER"]
            },
            subject: mailBody.subject,
            to: mailBody.to,
            html: mailBody.html
        });

        console.log('Email sent successfully:', {
            messageId: info.messageId,
            response: info.response,
            accepted: info.accepted,
            rejected: info.rejected
        });
        return true;
    } catch (error) {
        console.error('Failed to send email:', {
            error: error.message,
            code: error.code,
            command: error.command,
            responseCode: error.responseCode,
            response: error.response
        });
        throw error;
    }
}

export default sendEmail;