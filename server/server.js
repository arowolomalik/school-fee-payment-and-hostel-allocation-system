const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS // Your email password
    }
});

app.post('/api/request-reset', (req, res) => {
    const { email } = req.body;

    // Create a reset link (this should be more secure in a real app)
    const resetLink = `http://your-frontend-url/reset-password?email=${email}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click the link to reset your password: ${resetLink}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Error sending email.' });
        }
        res.status(200).json({ success: true, message: 'Reset link sent to your email.' });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});