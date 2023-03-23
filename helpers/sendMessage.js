const twilio = require('twilio');
const { accountSid, authToken, number, whatsappNumber } = require('../config/environment');

module.exports.sendMessage = async (to, body, sendToWhatsapp) => {
  try {
    const from = sendToWhatsapp ? whatsappNumber : number;
    const sendTo = sendToWhatsapp ? `whatsapp:+${to}` : `+${to}`;

    const client = twilio(accountSid, authToken);
    const message = await client.messages.create({
      body,
      from,
      to : sendTo,
    });
  
    return {
      result: 'success',
      messageId: message.sid,
    };
  } catch (err) {
    return {
      result: 'error',
      message: err.message,
    }
  }
};
