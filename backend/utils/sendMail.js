const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     // use .env for security
    pass: process.env.EMAIL_PASS
  }
});

async function sendOTPEmail(to, otp) {
  await transporter.sendMail({
    from: '"U-Love" <no-reply@ulove.com>',
    to,
    subject: 'U-Love OTP Verification',
    html: `<p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`
  });
}

module.exports = sendOTPEmail;
