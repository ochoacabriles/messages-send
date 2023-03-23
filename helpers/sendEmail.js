const nodemailer = require('nodemailer');
const { email, pass } = require('../config/environment');

module.exports.sendMail = async (to, body) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    auth: {
        user: email,
        pass,
    }
  });

  try {
    const info = await transporter.sendMail({
      from: `Rafael Ochoa <${email}>`, // sender address
      to, // list of receivers
      subject: "Hello ✔", // Subject line
      text: body, // plain text body
      html: `<h1>${body}</h1>`, // html body
    });
    console.log(`Done: ${JSON.stringify(info, null, 2)}`);

    return {
      result: 'success',
      messageId: info.messageId,
    }
  } catch (err) {
    console.log(err);
    return {
      result: 'error',
      message: err.message,
    };
  }

};
