import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

async function sendEmail({ to, subject, text, html }) {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            text,
            html
        });
        return info;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default sendEmail;