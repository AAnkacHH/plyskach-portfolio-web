import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { from, to, subject, text, files } = req.body;

    if (!subject || !text) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: from || process.env.SMTP_USER, // Fallback to auth user if from is not provided or if we want to send AS the authenticated user
            to: to || process.env.CONTACT_EMAIL,
            subject,
            text,
            attachments: files?.map((file) => ({
                filename: file.name,
                content: file.data, // Expecting base64 string without data URI scheme prefix if the frontend strips it, or we handle it here.
                encoding: 'base64',
            })),
        };

        // If the frontend sends data URI (e.g. "data:image/png;base64,..."), Nodemailer can handle it if passed as 'path' or we strip it.
        // However, the current frontend strips it: "e.target.result.split(',')[1]".
        // So 'content' + 'encoding: base64' is correct.

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Email sending error:', error);
        return res.status(500).json({ success: false, errorMessage: error.message });
    }
}
