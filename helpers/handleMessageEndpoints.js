const { randomBytes } = require('crypto');
const { handleResponse } = require("./handleResponse");
const { sendMessage } = require("./sendMessage");
const { validateNumber } = require("./validateNumber");

module.exports.handleMessagesEndpoints = async (endpoint, req, res) => {
  const number = req.query.number;

  if (!number || !validateNumber(number)) {
    res.status(500).send('Please send a valid number');
    return;
  }

  const result = await sendMessage(number, randomBytes(8).toString('hex'), endpoint === 'whatsapp');

  handleResponse(result, res);
};
