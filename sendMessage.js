const twilio = require('twilio');
const { accountSid, authToken, number } = require('./config/environment');

const sendMessage = async (to, body) => {
  try {
    const client = twilio(accountSid, authToken);
    const message = await client.messages.create({
      body,
      from: number,
      to: `+52${to}`,
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

module.exports = sendMessage;
