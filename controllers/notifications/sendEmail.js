const nodemailer = require('nodemailer');
const { randomBytes } = require('crypto');
const { sender, pass } = require('../../config/environment');

module.exports.sendEmail = async (email) => {
  if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return {
      success: false,
      reason: 'Invalid email',
    };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    auth: {
        user: sender,
        pass,
    }
  });

  try {
    const body = `Hello! Your code to verify your email is ${randomBytes(8).toString('hex')}`;
    const info = await transporter.sendMail({
      from: `Rafael Ochoa <${sender}>`, // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: body, // plain text body
      html: `<h1>${body}</h1>`, // html body
    });

    return {
      success: true,
      messageId: info.messageId,
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      reason: err.message,
    };
  }
};
