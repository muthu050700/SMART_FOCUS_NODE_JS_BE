import nodemailer from "nodemailer";
import { OTP_VALIDATION_FORMAT, TUTION_CENTER_NAME } from "../utils/constant.js";

const transporter = nodemailer.createTransport({
    service: OTP_VALIDATION_FORMAT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

const sendEmailService = async (to: string, subject: string, content: string) => {
    const mailOptions = {
        from: `${TUTION_CENTER_NAME} <${process.env.EMAIL_USER}>`,
        to,
        subject: subject,
        html: content,
    };

    await transporter.sendMail(mailOptions);
}

export default sendEmailService;